# AI Resume Roaster — Tutorial

## 1. Setup

Install the project dependencies:

```bash
npm install
```
Create the required environment files and add the Supabase and Groq credentials.

## 2. Database Setup

Configure the Supabase PostgreSQL connection in the environment variables.

Run:
```bash
npx prisma db push
npx prisma generate
```
This creates the required database tables using the Prisma schema.

## 3. Run the Application

Start the development server:
```bash
npm run dev
```
Open:
```
http://localhost:3000
```
## 4. Resume Analysis Flow

The application works in the following order:

Upload PDF
    ↓
Validate File
    ↓
Extract Text using pdf-parse
    ↓
Send Resume Text to Groq
    ↓
Generate AI Feedback
    ↓
Save Data using Prisma
    ↓
Store in Supabase
    ↓
Display Resume Feedback

## 5. Feedback

The generated analysis includes:

- Resume Score
- Overall Summary
- Strengths
- Weaknesses
- Suggestions
- Detected Skills
- ATS Feedback

Each analysis is stored in the database and can also be viewed through the dedicated feedback page.

## 6. Production Check

Before deployment, create a production build:
```bash
npm run build
```
If the build succeeds:
```bash
npm start
```
The application is then ready for deployment.
