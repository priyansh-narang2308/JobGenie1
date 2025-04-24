import express from 'express';
import multer from 'multer';
import { 
    extractResumeText, 
    extractResumeSkills, 
    extractJDSkills,
    compareSkillsMatch,
    customiseResume, 
    generateCoverLetter 
} from '../controllers/resumeController.js';

const upload = multer();
const router = express.Router();

router.post('/extract-text', upload.single('file'), extractResumeText);
router.post('/extract-skills', extractResumeSkills);
router.post('/extract-jd-skills', extractJDSkills);
router.post('/match-skills', compareSkillsMatch);
router.post('/customise', customiseResume);
router.post('/generate-cover-letter', generateCoverLetter);

export default router;
