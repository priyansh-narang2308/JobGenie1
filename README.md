# 💼 JobGenie — Your Career Copilot 🚀

![image](https://github.com/user-attachments/assets/5a7e6b5a-457e-4c07-af59-d85f407a9aaf)

JobGenie is a comprehensive **AI-powered career assistant** built to supercharge your job application journey. From crafting the perfect resume and cover letter to discovering jobs, scoring your profile with ATS, and practicing interviews — JobGenie has it all, in one place.

---

## 🌟 Features

### 📄 Resume Optimization (LaTeX + ATS Score)
- Generate **professional resumes using LaTeX** based on user input.
- Upload existing resumes and receive:
  - **ATS (Applicant Tracking System) score**
  - **Keyword matching**
  - Suggestions to enhance formatting, content, and structure for passing recruiter filters.

### 📝 Cover Letter Generator
- Automatically generate personalized cover letters based on:
  - Job title
  - Description
  - User resume content
- Export cover letters in PDF or LaTeX formats.

### 🔍 Job Search (LinkedIn API Integration)
- Search real-time job postings using **LinkedIn Jobs API**.
- Filter jobs by:
  - Job title
  - Location
  - Experience level
  - Company
- Save and bookmark jobs for later.

### 🧠 AI-Powered Career Guidance Chatbot
- Personalized chatbot trained on career advising data.
- Helps with:
  - Resume feedback
  - Interview strategies
  - Job application tips
  - Learning resources based on career goals

### 🎤 AI Mock Interview Generator
- Generates **5 interview questions and answers** tailored to:
  - Job role
  - Description
  - Experience level
- Uses **Gemini AI** for relevant, realistic prompts.
- Saves interview sessions for review and preparation.

---

## 🛠️ Tech Stack

| Tech           | Purpose                                 |
|----------------|------------------------------------------|
| **Next.js 13** | Fullstack framework                      |
| **Tailwind CSS** | Clean, responsive UI                   |
| **Clerk**      | User authentication                     |
| **PostgreSQL** | Database with Drizzle ORM               |
| **Gemini API** | AI responses (interviews, chatbot, etc.) |
| **LaTeX.js**   | Resume rendering and formatting          |
| **LinkedIn API** | Job listing data                       |
| **Moment.js**  | Time formatting                          |
| **Shadcn/UI**  | UI components                            |
| **Lucide Icons** | Icon styling                           |

---

## 📁 Project Structure


## 🔐 User Flow

1. **Signup/Login** using Clerk authentication.
2. Access the dashboard to:
   - Generate ATS-optimized resumes
   - Create tailored cover letters
   - Search and save jobs
   - Talk to the career chatbot
   - Prepare with AI-generated mock interviews

---

## 👥 Team Members

| Name             | Role                              
|------------------|-----------------------------------
| **Priyansh Sharma**  | Full Stack Dev, AI Integration     
| *Aditya Menon*     | Resume & ATS Module Lead         
| *Teammate 3*     | UI/UX, LinkedIn Integration      
| *Teammate 4*     | Chatbot & Backend APIs          

---

## 📦 Setup Instructions

```bash
# Clone the repo
git clone https://github.com/your-username/jobgenie.git
cd jobgenie

# Install dependencies
npm install

# Create your environment file
cp .env.example .env.local
# Add the required API keys and environment variables:
# - Clerk API keys
# - Gemini API key
# - LinkedIn API credentials
# - PostgreSQL URL

# Run the development server
npm run dev
```

---

## 🧠 AI Services Used

- **Gemini API** for:
  - Mock interview generation
  - Career guidance chatbot responses
  - Resume and cover letter evaluation
- **LaTeX.js** for dynamic PDF resume generation
- **LinkedIn API** for live job search and filtering

---

## 🔮 Upcoming Features

- [ ] PDF resume parser with instant feedback
- [ ] Job application tracker with status updates
- [ ] Portfolio website generator (based on resume data)
- [ ] Multi-language resume support
- [ ] AI-based skill gap analysis

---

## 📄 License

MIT License. Feel free to fork, improve, and build upon JobGenie.

---

> 🔗 _Made with ♥ the Team **HARD COMMIT** for jobseekers and dream chasers._
