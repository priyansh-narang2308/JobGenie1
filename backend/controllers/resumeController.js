import fs from 'fs';
import path from 'path';
import latex from 'node-latex';
import pdfParse from 'pdf-parse';
import { writeFileSync } from "fs";
import { geminiProcessor } from '../utils/gemini.js';

const latexTemplatePath = path.join(process.cwd(), 'templates', 'resume-template.tex');
const latexTemplate = fs.readFileSync(latexTemplatePath, 'utf8');

async function generatePdfFromLatex(latexFile, outputFile) {
  return new Promise((resolve, reject) => {
      const pdfStream = latex(fs.createReadStream(latexFile));
      const output = fs.createWriteStream(outputFile);

      let errorLog = '';
      pdfStream.on('error', (err) => {
        errorLog += err.message || err.toString();
        reject(new Error(`LaTeX compilation failed: ${errorLog}`));
      });
      
      pdfStream.pipe(output);

      output.on('finish', () => resolve(outputFile));
      output.on('error', (err) => reject(err));
  });
} 

export const extractResumeText = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No file uploaded' });
    }

    const pdfBuffer = req.file.buffer;
    const pdfData = await pdfParse(pdfBuffer);
    const resumeText = pdfData.text;
    return res.json({ resumeText });

  } catch (error) {
    console.error('Error in extractResumeText:', error);
    res.status(500).json({ error: 'Server error while extracting resume text' });
  }
};

export const extractResumeSkills = async (req, res) => {
  try {
    const { text } = req.body;

    if (!text) {
      return res.status(400).json({ error: 'No resume text provided' });
    }

    const PROMPT = `
      You are an expert resume parser.

      INSTRUCTIONS:
      1. Extract ONLY the skills explicitly mentioned by the candidate from the provided resume text. These can be technical skills or soft skills. DO NOT inlclude random skills.
      2. If multiple related skills are mentioned together, such as "C/C++", treat them as individual skills if relevant (i.e., separate them into distinct skills like "C" and "C++").
      3. Return the extracted skills in STRICTLY in JSON format with the following structure:
      {
        "Skills": ["Skill1", "Skill2", ..., "SkillN"]
      }

      Resume Text:
      """
      ${text}
      """
    `;

    let parsedResponse = null;
    let attempts = 0;

    while (attempts < 5) {
      const geminiResponse = await geminiProcessor(PROMPT);

      try {
        let responseText = geminiResponse.trim();
        let startIdx = responseText.indexOf('{');
        let endIdx = responseText.lastIndexOf('}') + 1;

        if (startIdx >= 0 && endIdx > startIdx) {
          let jsonStr = responseText.slice(startIdx, endIdx);
          parsedResponse = JSON.parse(jsonStr);
          break;
        } else {
          throw new Error("Invalid JSON structure");
        }
      } catch (err) {
        console.warn(`Attempt ${attempts + 1} failed to parse JSON:`, err.message);
        attempts++;
      }
    }

    if (!parsedResponse) {
      return res.status(500).json({ error: 'Failed to parse skills after multiple attempts' });
    }

    return res.json({
      skills: parsedResponse.Skills
    });

  } catch (error) {
    console.error('Error in extractSkills:', error);
    res.status(500).json({ error: 'Server error while extracting skills from resume text' });
  }
};
  
export const generateCoverLetter = async (req, res) => {
  const { resumeText, jobDescription, selfDescription } = req.body;
  
  try {
    let PROMPT = `
You are a career writing assistant. 
INSTRUCTIONS:
- Write a professional cover letter tailored to the job description below, based on the following resume and self-description.
- DON'T ADD ANY PLACEHOLDERS, this is the final cover letter that will be directly submitted.
- The tone and language should be like its written by a developer not AI generated.

1. Resume Text: ${resumeText}

2. Job Description: ${jobDescription}

3. Self Description: ${selfDescription}

Return only the body of the cover letter, no extra commentary.
`;
    let coverAttempts = 0;
    let coverBase64 = '';

    while (coverAttempts < 5) {
      try {
        const coverResult = await geminiProcessor(PROMPT);
        const coverText = coverResult.trim();
    
        const coverLatex = `
\\documentclass{article}
\\usepackage{geometry}
\\geometry{margin=1in}
\\setlength{\\parindent}{0pt} 
\\setlength{\\parskip}{1em} 
\\begin{document}
${coverText}
\\end{document}
`;
        writeFileSync("cover_letter.tex", coverLatex);
        await generatePdfFromLatex('cover_letter.tex', 'cover_letter.pdf');
        const coverPdf = fs.readFileSync('cover_letter.pdf');
        coverBase64 = coverPdf.toString('base64');
        break;
      } catch (err) {
        console.error(`Cover Letter Attempt ${coverAttempts + 1} failed!`, err);
        PROMPT += `\n\nError encountered: ${err.message}. \nPREVENT this error.`;
        coverAttempts++;
      }
    }

    if (coverAttempts === 5) {
      return res.status(500).json({ error: "Cover letter generation failed after multiple attempts." });
    }

    res.json({
      coverLetter: coverBase64,
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Cover letter generation failed" });
  }
}

export const customiseResume = async (req, res) => {
  const { resumeText, jobDescription, selfDescription } = req.body;
  
  try {
    let PROMPT = `
You are an expert resume writer. 

INSTRUCTIONS:
- Based on the information below, customize the following LaTeX resume template to tailor it PERFECTLY for the given job.
- The resume must be highly customised for the job description highlighting key content that make this ideal for the given Job Description.
- The resume must also be designed to pass ATS with at least 80+ score.
- Remove any sections or links that arent relevant or have no data avialable for. 
- DO NOT USE math symbols lile _, ^, &, etc. as they will cause errors unless enclosed properly.
- Prevent errors like "Misplaced alignment tab character &" or "Extra }, or forgotten \\endgroup."
- DO NOT USE any placeholders in the resume. The generated resume will be directly submitted.

1. Resume Text: ${resumeText}

2. Job Description: ${jobDescription}

3. Candidate Description: ${selfDescription}

Here is the LaTeX Template:
\`\`\`latex
${latexTemplate}
\`\`\`

Return only the modified LaTeX content.
`;  

    let resumeAttempts = 0;
    let resumeBase64 = '';
    
    while (resumeAttempts < 5) {
      try {
        const resumeResult = await geminiProcessor(PROMPT);
        let resumeLatex = resumeResult.trim();

        if (resumeLatex.startsWith('```latex')) {
          resumeLatex = resumeLatex.slice('```latex'.length).trim();
        }
        if (resumeLatex.endsWith('```')) {
          resumeLatex = resumeLatex.slice(0, -3).trim();
        }

        writeFileSync("custom_resume.tex", resumeLatex);
        await generatePdfFromLatex('custom_resume.tex', 'custom_resume.pdf');

        const resumePdf = fs.readFileSync('custom_resume.pdf');
        resumeBase64 = resumePdf.toString('base64');
        break;
      } catch (err) {
        console.error(`Attempt ${resumeAttempts + 1} failed!`, err);
        PROMPT += `\n\nError encountered: ${err.message}. PREVENT this error.`;
        resumeAttempts++;
      }
    }

    if (resumeAttempts === 5) {
      return res.status(500).json({ error: "Resume customisation failed after multiple attempts." });
    }

    res.json({
      resume: resumeBase64,
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Resume customisation failed" });
  }
}
