import { z } from "zod";
import {
  AiAgentToolHandler,
  ToolCallError,
  invalidArgumentsResponseFormatter,
} from "@tiptap-pro/extension-ai-agent";

// Schema for validating replace tool arguments
const replaceToolSchema = z.object({
  find: z.string().min(1, "Find text cannot be empty"),
  replace: z.string(),
});

// Custom replace tool handler for client-side
export const replaceAllToolHandler = (): AiAgentToolHandler => ({
  // Unique identifier for the tool
  name: "replace_all",
  modifiesEditor: true,
  handleToolCall: ({ toolCall, html, setHtml }) => {
    // Validate the arguments
    const result = replaceToolSchema.safeParse(toolCall.arguments);
    if (!result.success) {
      // Return an error message to the AI
      throw new ToolCallError(invalidArgumentsResponseFormatter(result.error));
    }
    const args = result.data;

    try {
      // Replace all occurrences of the find text with the replace text
      const replacedHtml = html.replaceAll(args.find, args.replace);

      // Set the new content in the editor
      setHtml(replacedHtml);

      // Return a success message
      return `Successfully replaced all occurrences of "${args.find}" with "${args.replace}".`;
    } catch (error) {
      console.error("Error in replace tool handler:", error);
      throw new ToolCallError(`Failed to replace text`);
    }
  },
});
