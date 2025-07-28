"use client";

import { AiAgentProvider } from "@tiptap-pro/extension-ai-agent";
import { serverSideToolsVercelAiSdkService } from "@/src/services/server-side-tools/vercel-ai-sdk";
import App from "@/src/view/server-side-tools/common";

const provider = new AiAgentProvider({
  resolver: async ({ chatMessages, schemaAwarenessData }) => {
    const response = await serverSideToolsVercelAiSdkService({
      chatMessages,
      schemaAwarenessData,
    });
    return response;
  },
  reviewOptions: {
    extension: "aiChanges",
  },
});

export default function ServerSideToolsVercelAiSdkView() {
  return <App provider={provider} />;
}
