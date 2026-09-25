import formidable from "formidable";
import fs from "fs";
import { extractTextFromPDF } from "../../lib/pdfParser";
import { analyzeResume } from "../../lib/claude";
import { prisma } from "../../lib/db";

export const config = {
  api: {
    bodyParser: false,
  },
};

function parseForm(req) {
  return new Promise((resolve, reject) => {
    const form = formidable({
      multiples: false,
      keepExtensions: true,
    });

    form.parse(req, (err, fields, files) => {
      if (err) {
        reject(err);
        return;
      }

      resolve({ fields, files });
    });
  });
}

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({
      error: "Method not allowed",
    });
  }

  try {
    console.log("📄 Resume upload received");

    const { files } = await parseForm(req);

    const uploadedFile = Array.isArray(files.resume)
      ? files.resume[0]
      : files.resume;

    if (!uploadedFile) {
      return res.status(400).json({
        error: "No resume PDF uploaded.",
      });
    }

    console.log("📎 File:", uploadedFile.originalFilename);

    const fileBuffer = fs.readFileSync(uploadedFile.filepath);

    console.log("📖 Extracting resume text...");

    const resumeText = await extractTextFromPDF(fileBuffer);

    console.log(
      "✅ Text extracted:",
      resumeText.length,
      "characters"
    );

    console.log("🤖 Sending resume to Groq...");

    const analysis = await analyzeResume(resumeText);

    console.log("✅ Groq analysis received");

    const resume = await prisma.resume.create({
      data: {
        fileName: uploadedFile.originalFilename || "resume.pdf",
        extractedText: resumeText,

        analysis: {
          create: {
            score: analysis.score,
            summary: analysis.summary,
            strengths: analysis.strengths,
            weaknesses: analysis.weaknesses,
            suggestions: analysis.suggestions,
            skills: analysis.skills,
            atsFeedback: analysis.atsFeedback,
          },
        },
      },

      include: {
        analysis: true,
      },
    });

    console.log("💾 Analysis saved to database");

    return res.status(200).json({
      success: true,
      resumeId: resume.id,
      analysis: resume.analysis,
    });
  } catch (error) {
    console.error("❌ Upload error:", error);

    return res.status(500).json({
      error: error.message || "Something went wrong.",
    });
  }
}