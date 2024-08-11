import { NextResponse } from "next/server";
import OpenAI from "openai";

export async function POST(req) {
  const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
  });
  const data = await req.json();

  const completion = await openai.chat.completions.create({
    messages: [
      { role: "system", content: "You are a helpful assistant." },
      ...data,
    ],
    model: "gpt-4o-mini",
  });

  return NextResponse.json(
    { message: completion.choices[0].message.content },
    { status: 200 }
  );
}
