"use client";

import { AiAgentProvider } from "@tiptap-pro/extension-ai-agent";
import { serverSideToolsOpenaiResponsesApiService } from "@/src/services/server-side-tools/openai-responses-api";
import App from "@/src/view/server-side-tools/common";

const provider = new AiAgentProvider({
  resolver: async ({ chatMessages, schemaAwarenessData }) => {
    const response = await serverSideToolsOpenaiResponsesApiService({
      chatMessages,
      schemaAwarenessData,
    });
    return response;
  },
  reviewOptions: {
    extension: "aiChanges",
  },
});

export default function ServerSideToolsOpenaiResponsesApiView() {
  return <App provider={provider} />;
}
