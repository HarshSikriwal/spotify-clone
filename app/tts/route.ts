import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.NEXT_PUBLIC_OPENAI_KEY!,
});

export async function POST(req: NextRequest, res: NextResponse) {
  const text = await req.text();

  const resp = await openai.audio.speech.create({
    model: "tts-1",
    voice: "echo",
    input: text.slice(0, 500),
    response_format: "mp3",
  });

  const buffer = await resp.arrayBuffer();
  const blob = new Blob([buffer], { type: "audio/mp3" });
  const headers = { "Content-Type": "audio/mp3" };
  return new Response(blob, { headers });
}
