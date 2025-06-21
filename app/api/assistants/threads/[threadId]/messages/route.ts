import { ASSISTANT_ID, openai } from "@/app/openai";
import { NextRequest } from "next/server";

export const runtime = "nodejs";

// Invia un nuovo messaggio a un thread
export async function POST(
  request: NextRequest,
  { params }: { params: { threadId: string } }
) {
  const { threadId } = params;
  const { content } = await request.json();

  await openai.beta.threads.messages.create(threadId, {
    role: "user",
    content,
  });

  const stream = openai.beta.threads.runs.stream(threadId, {
    assistant_id: ASSISTANT_ID,
  });

  return new Response(stream.toReadableStream());
}
