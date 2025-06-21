import { ASSISTANT_ID, openai } from "@/app/openai";
import { NextRequest } from "next/server";

// Carica un file nello vector store dell'assistente
export async function POST(request: NextRequest) {
  const formData = await request.formData();
  const file = formData.get("file") as File;

  const vectorStoreId = await getOrCreateVectorStore();

  const openaiFile = await openai.files.create({
    file,
    purpose: "assistants",
  });

  await openai.beta.vectorStores.files.create(vectorStoreId, {
    file_id: openaiFile.id,
  });

  return new Response(JSON.stringify({ fileId: openaiFile.id }), {
    headers: { "Content-Type": "application/json" },
  });
}

// Elenca tutti i file nello vector store dell'assistente
export async function GET() {
  const vectorStoreId = await getOrCreateVectorStore();
  const fileList = await openai.beta.vectorStores.files.list(vectorStoreId);

  const filesArray = await Promise.all(
    fileList.data.map(async (file) => {
      const fileDetails = await openai.files.retrieve(file.id);
      const vectorFileDetails = await openai.beta.vectorStores.files.retrieve(
        vectorStoreId,
        file.id
      );
      return {
        file_id: file.id,
        filename: fileDetails.filename,
        status: vectorFileDetails.status,
      };
    })
  );

  return Response.json(filesArray);
}

// Elimina un file dal vector store dell'assistente
export async function DELETE(request: NextRequest) {
  const body = await request.json();
  const fileId = body.fileId;

  const vectorStoreId = await getOrCreateVectorStore();
  await openai.beta.vectorStores.files.del(vectorStoreId, fileId);

  return new Response(null, { status: 204 });
}

/* Helper: recupera o crea vector store */
const getOrCreateVectorStore = async () => {
  const assistant = await openai.beta.assistants.retrieve(ASSISTANT_ID);

  if (assistant.tool_resources?.file_search?.vector_store_ids?.length > 0) {
    return assistant.tool_resources.file_search.vector_store_ids[0];
  }

  const vectorStore = await openai.beta.vectorStores.create({
    name: "tradelia-invest-vector-store",
  });

  await openai.beta.assistants.update(ASSISTANT_ID, {
    tool_resources: {
      file_search: {
        vector_store_ids: [vectorStore.id],
      },
    },
  });

  return vectorStore.id;
};
