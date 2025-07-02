"use client";

import { AiAgentProvider } from "@tiptap-pro/extension-ai-agent";
import { serverSideToolsVercelAiSdkService } from "@/src/services/server-side-tools/vercel-ai-sdk";
import App from "@/src/view/server-side-tools/common";

const provider = new AiAgentProvider({
  resolver: async ({ chatMessages }) => {
    const response = await serverSideToolsVercelAiSdkService({
      chatMessages,
    });
    return response;
  },
});

export default function ServerSideToolsVercelAiSdkView() {
  return <App provider={provider} />;
}
