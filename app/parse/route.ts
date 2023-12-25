import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { url } = (await req.json()) as { url: string };

  const res = await fetch(url);
  const html = await res.text();

  return new NextResponse(html, {
    headers: {
      "Content-Type": "text/plain",
    },
  });
}
