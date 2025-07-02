import { AiAgentTool } from "@tiptap-pro/extension-ai-agent-server";

// Custom replace tool definition for server-side
export const replaceAllTool = (): AiAgentTool => ({
  name: "replace_all",
  description:
    "Replaces all occurrences of a word in the document with another word",
  parameters: {
    type: "object",
    properties: {
      find: {
        type: "string",
        description: "The word or phrase to find in the document",
      },
      replace: {
        type: "string",
        description: "The word or phrase to replace it with",
      },
    },
    required: ["find", "replace"],
  },
});
