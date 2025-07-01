import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

export async function POST(req) {
  const { topic } = await req.json();

  const prompt = `Write a well-structured SEO blog on the topic: "${topic}" with H1-H3 headings and detailed content. At the end, suggest a relevant blog category (e.g., AI, Tech, Environment) as a single word. Format response as:
---
Category: <category>
Content:
<blog content>
`;

  try {
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = await response.text();

    // Separate category and content
    const categoryMatch = text.match(/Category:\s*(.*)\n/i);
    const contentMatch = text.match(/Content:\s*([\s\S]*)/i);

    const category = categoryMatch ? categoryMatch[1].trim() : "General";
    const content = contentMatch ? contentMatch[1].trim() : text;

    return Response.json({ content, category });
  } catch (error) {
    console.error("Gemini Error:", error);
    return Response.json({ error: error.message }, { status: 500 });
  }
}
