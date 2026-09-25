# 🔥 AI Resume Roaster

AI Resume Roaster is an AI-powered web application that analyzes resumes and provides practical feedback on resume quality, strengths, weaknesses, ATS compatibility, detected skills, and improvement suggestions.

Users can upload a PDF resume and receive an AI-generated resume review within seconds.

---

## ✨ Features

- 📄 Upload resume in PDF format
- 🔍 Extract text from PDF resumes
- 🤖 AI-powered resume analysis using Groq
- 📊 Resume score from 0–100
- 💪 Strengths identification
- ⚠️ Weakness detection
- 💡 Improvement suggestions
- 🧠 Detected skills
- 🤖 ATS compatibility feedback
- 💾 Store resume analysis in PostgreSQL
- 📋 Dedicated feedback page for each analyzed resume
- 🔄 Analyze another resume without refreshing the page
- 📱 Responsive and clean user interface

---

## 🛠️ Tech Stack

### Frontend
- Next.js 14
- React
- Tailwind CSS

### Backend
- Next.js API Routes
- Node.js
- Formidable
- pdf-parse

### AI
- Groq API
- OpenAI GPT-OSS-20B model

### Database
- PostgreSQL
- Supabase
- Prisma ORM

---

## 📁 Project Structure

```text
ai-resume-roaster/
│
├── components/
│   ├── FeedbackCard.jsx
│   ├── Header.jsx
│   ├── ScoreCircle.jsx
│   └── UploadDropzone.jsx
│
├── lib/
│   ├── claude.js
│   ├── db.js
│   └── pdfParser.js
│
├── pages/
│   ├── api/
│   │   └── upload.js
│   ├── feedback/
│   │   └── [id].js
│   ├── _app.js
│   ├── index.js
│   └── upload.js
│
├── prisma/
│   └── schema.prisma
│
├── styles/
│   └── globals.css
│
├── .env.example
├── .gitignore
├── package.json
├── README.md
└── TUTORIAL.md

---

## ⚙️ How It Works

The application follows this workflow:

User uploads PDF
       ↓
Formidable receives the file
       ↓
PDF text is extracted using pdf-parse
       ↓
Extracted resume text is sent to Groq
       ↓
AI analyzes the resume
       ↓
Score + feedback + skills + ATS feedback generated
       ↓
Analysis is stored using Prisma
       ↓
Data is saved in Supabase PostgreSQL
       ↓
Feedback is displayed to the user
```
---

## 🚀 Getting Started

1. Clone the Repository
```bash
git clone <your-github-repository-url>
cd ai-resume-roaster
```
2. Install Dependencies
```bash
npm install
```
Create a .env file in the project root.

Add:
```bash
DATABASE_URL="your_supabase_transaction_pooler_url"
DIRECT_URL="your_supabase_session_pooler_url"
```
Create a .env.local file and add:
```bash
GROQ_API_KEY="your_groq_api_key"
NEXTAUTH_SECRET="your_nextauth_secret"
NEXTAUTH_URL="http://localhost:3000"
```
Never commit your real environment files to GitHub.

## 🗄️ Database Setup

After configuring the Supabase PostgreSQL connection, run:
```bash
npx prisma db push
```
Then generate the Prisma client:
```bash
npx prisma generate
```
## ▶️ Run the Application

Start the development server:
```bash
npm run dev
```
Open the application in your browser:

http://localhost:3000

## 📄 Resume Requirements

The application currently accepts:

PDF files only
Maximum file size: 5 MB

## 🤖 AI Analysis

The AI analyzes the extracted resume text and generates:

Overall resume score
- Summary
- Strengths
- Weaknesses
- Suggestions
- Detected skills
- ATS feedback

The AI response is returned as structured JSON and stored in the database.

## 🗃️ Database Models

The project uses three main Prisma models.

### User

Stores user information for authentication-related functionality.

### Resume

Stores:

- Resume filename
- Extracted resume text
- User relationship
- Creation timestamp
- Update timestamp

### Analysis

Stores:

- Resume score
- Summary
- Strengths
- Weaknesses
- Suggestions
- Detected skills
- ATS feedback

### 🔐 Environment Variables

The following environment variables are required:

Variable	Purpose
DATABASE_URL	Supabase PostgreSQL transaction pooler
DIRECT_URL	Supabase PostgreSQL session connection
GROQ_API_KEY	Groq API authentication
NEXTAUTH_SECRET	NextAuth secret
NEXTAUTH_URL	Application URL

See .env.example for the required format.

### 🧪 Production Build

Before deployment, test the production build:
```bash
npm run build
```
If the build succeeds, start the production server with:
```bash
npm start
```
### 📌 Project Purpose

The AI Resume Roaster project demonstrates how generative AI can be integrated into a full-stack web application to analyze resumes and provide structured, actionable feedback.

The project combines:

- Web development
- PDF processing
- Generative AI
- API development
- Database management
- ORM-based data persistence
- AI-generated resume analysis

## 🔄 Application Flow

Upload Resume
      ↓
Validate PDF
      ↓
Extract Resume Text
      ↓
Send Text to Groq
      ↓
Generate Structured AI Feedback
      ↓
Store Resume + Analysis
      ↓
Display Results
      ↓
View Dedicated Feedback Page

## 👩‍💻 Author

Riya Maheshwari