import pdfParse from "pdf-parse";

export async function extractTextFromPDF(buffer) {
  if (!buffer) {
    throw new Error("No PDF buffer provided.");
  }

  try {
    const data = await pdfParse(buffer);

    if (!data.text || !data.text.trim()) {
      throw new Error("Could not extract text from the PDF.");
    }

    return data.text.trim();
  } catch (error) {
    console.error("PDF parsing error:", error);
    throw new Error("Failed to extract text from PDF.");
  }
}