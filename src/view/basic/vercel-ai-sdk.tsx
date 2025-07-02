"use client";

import { AiAgentProvider } from "@tiptap-pro/extension-ai-agent";
import { basicVercelAiSdkService } from "@/src/services/basic/vercel-ai-sdk";
import App from "@/src/view/basic/common";

const provider = new AiAgentProvider({
  resolver: async ({ chatMessages }) => {
    const response = await basicVercelAiSdkService({ chatMessages });
    return response;
  },
});

export default function BasicVercelAiSdkView() {
  return <App provider={provider} />;
}
