import { openai } from "@/app/openai";

export const runtime = "nodejs";

// Crea un nuovo thread
export async function POST() {
  const thread = await openai.beta.threads.create();
  return Response.json({ threadId: thread.id });
}
