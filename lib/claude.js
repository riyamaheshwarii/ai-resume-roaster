import Groq from "groq-sdk";

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

export async function analyzeResume(resumeText) {
  const prompt = `
You are an expert resume reviewer and ATS specialist.

Analyze the following resume and return ONLY valid JSON.

The JSON must have exactly these fields:

{
  "score": number,
  "summary": "short overall assessment",
  "strengths": ["strength 1", "strength 2", "strength 3"],
  "weaknesses": ["weakness 1", "weakness 2", "weakness 3"],
  "suggestions": ["suggestion 1", "suggestion 2", "suggestion 3"],
  "skills": ["skill 1", "skill 2"],
  "atsFeedback": ["ATS feedback 1", "ATS feedback 2"]
}

Rules:
- score must be an integer from 0 to 100.
- Be honest and specific.
- Focus on resume quality, ATS compatibility, skills, impact, clarity, formatting, and missing information.
- Do not invent experience that isn't present.
- Keep each item concise.
- Return ONLY JSON. No markdown. No explanation outside JSON.

Resume:
${resumeText}
`;

  const completion = await groq.chat.completions.create({
  model: "openai/gpt-oss-20b",
  messages: [
    {
      role: "user",
      content: prompt,
    },
  ],
  temperature: 0.3,
  response_format: {
    type: "json_object",
  },
});

  const content = completion.choices[0]?.message?.content;

  if (!content) {
    throw new Error("Groq returned an empty response.");
  }

  try {
    return JSON.parse(content);
  } catch (error) {
    console.error("Failed to parse Groq response:", content);
    throw new Error("Groq returned invalid JSON.");
  }
}