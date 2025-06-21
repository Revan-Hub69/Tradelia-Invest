import { openai } from "@/app/openai";
import { NextRequest } from "next/server";

// Invia gli output dei tool per un run su un thread
export async function POST(
  request: NextRequest,
  { params }: { params: { threadId: string } }
) {
  const { threadId } = params;
  const { toolCallOutputs, runId } = await request.json();

  const stream = openai.beta.threads.runs.submitToolOutputsStream(
    threadId,
    runId,
    {
      tool_outputs: toolCallOutputs,
    }
  );

  return new Response(stream.toReadableStream());
}
