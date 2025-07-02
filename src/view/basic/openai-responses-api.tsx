"use client";

import { AiAgentProvider } from "@tiptap-pro/extension-ai-agent";
import { basicOpenaiResponsesApiService } from "@/src/services/basic/openai-responses-api";
import App from "@/src/view/basic/common";

const provider = new AiAgentProvider({
  resolver: async ({ chatMessages }) => {
    const response = await basicOpenaiResponsesApiService({ chatMessages });
    return response;
  },
});

export default function BasicOpenaiResponsesApiView() {
  return <App provider={provider} />;
}
