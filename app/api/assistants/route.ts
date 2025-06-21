import { openai } from "@/app/openai";

export const runtime = "nodejs";

// Crea un nuovo assistente Tradelia Invest (solo per test!)
export async function POST() {
  const assistant = await openai.beta.assistants.create({
    instructions:
      "Sei Tradelia Invest AI Assistant. Aiuta l'utente con simulazioni di portafoglio, analisi finanziarie e monitoraggio dei mercati.",
    name: "Tradelia Invest Assistant",
    model: "gpt-4o",
    tools: [
      { type: "code_interpreter" },
      { type: "file_search" }
      // Qui puoi aggiungere altre funzioni reali quando le implementi
    ],
  });
  return Response.json({ assistantId: assistant.id });
}

