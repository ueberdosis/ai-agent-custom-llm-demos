import { useAiAgentProvider } from "../state/ai-agent-context.jsx";

/**
 * Renders a single AI chat message.
 * Displays an AI avatar and the message text.
 *
 * @param props - The component props.
 * @param props.message - The AI chat message to display.
 */
export function AiChatMessageComponent({ message }) {
  return (
    <div className="ai-chat-message">
      <div className="chat-message-avatar">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="lucide lucide-bot-icon lucide-bot"
        >
          <path d="M12 8V4H8" />
          <rect width="16" height="12" x="4" y="8" rx="2" />
          <path d="M2 14h2" />
          <path d="M20 14h2" />
          <path d="M15 13v2" />
          <path d="M9 13v2" />
        </svg>
      </div>
      <div className="chat-message-text">{message.text}</div>
    </div>
  );
}

/**
 * Props for the AskUserChatMessageComponent.
 */
/**
 * Renders a chat message component for displaying a question to the user.
 *
 * @param props - The component props.
 * @param props.question - The question to display to the user.
 */
export function AskUserChatMessageComponent({ question }) {
  return (
    <div className="ask-user-chat-message">
      <div className="label-small">Question</div>
      <pre>{question}</pre>
    </div>
  );
}

/**
 * Renders a chat message component for a checkpoint.
 * Displays a "Checkpoint" label and a button to restore the checkpoint.
 *
 * @param props - The component props.
 * @param props.message - The checkpoint chat message to display.
 */
export function CheckpointChatMessageComponent({ message }) {
  const { provider } = useAiAgentProvider();
  return (
    <div className="checkpoint-chat-message">
      <span className="label">🎯 Checkpoint set</span>
      <button
        type="button"
        onClick={() => provider.restoreCheckpoint(message.checkpoint)}
      >
        Restore
      </button>
    </div>
  );
}

/**
 * Renders a chat message component indicating that the AI agent's suggestion was rejected by the user.
 */
export function RejectionChatMessageComponent() {
  return (
    <div className="rejection-chat-message">
      <div className="label-small">Rejected by user</div>
    </div>
  );
}

/**
 * Renders a chat message component for displaying a task summary.
 *
 * @param props - The component props.
 * @param props.summary - The summary text to display.
 */
export function SummaryChatMessageComponent({ summary }) {
  return (
    <div className="summary-chat-message">
      <div className="label-small">Task Summary</div>
      <pre>{summary}</pre>
    </div>
  );
}

const toolTextMap = {
  read_first_chunk: "Document read",
  read_next_chunk: "Document read",
  read_previous_chunk: "Document read",
  replace_document: "Document edited",
  apply_diff: "Document edited",
  plan: "Action plan updated",
};

/**
 * Renders a chat message component for displaying information about a tool call.
 *
 * @param props - The component props.
 * @param props.name - The ID of the tool that was called.
 */
export function ToolCallChatMessageComponent({ name }) {
  return (
    <div className="tool-call-chat-message">
      <p className="label-small">{toolTextMap[name] || "Unknown tool call"}</p>
    </div>
  );
}

const toolErrorTextMap = {
  read_first_chunk: "Error reading document",
  read_next_chunk: "Error reading document",
  read_previous_chunk: "Error reading document",
  replace_document: "Error editing document",
  apply_diff: "Error editing document",
  plan: "Error updating action plan",
};

/**
 * Renders a chat message component for displaying information about a tool call error.
 *
 * @param props - The component props.
 * @param props.name - The ID of the tool that failed.
 */
export function ToolCallErrorChatMessageComponent({ name }) {
  return (
    <div className="tool-call-error-chat-message">
      <p className="label-small">
        {toolErrorTextMap[name] || "Tool call error"}
      </p>
    </div>
  );
}

/**
 * Renders a single user chat message.
 * Displays the message text and a user avatar.
 *
 * @param props - The component props.
 * @param props.message - The user chat message to display.
 */
export function UserChatMessageComponent({ message }) {
  return (
    <div className="user-chat-message">
      <div className="chat-message-text">{message.text}</div>
      <div className="chat-message-avatar">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="lucide lucide-user-icon lucide-user"
        >
          <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
          <circle cx="12" cy="7" r="4" />
        </svg>
      </div>
    </div>
  );
}

/**
 * Renders a chat message component for displaying a plan.
 *
 * @param props - The component props.
 * @param props.plan - The plan text to display.
 */
export function PlanChatMessageComponent({ plan }) {
  return (
    <>
      <ToolCallChatMessageComponent name="plan" />
      <div className="plan-chat-message">
        <pre>{plan}</pre>
      </div>
    </>
  );
}

/**
 * Renders a chat message component based on the message type.
 * It acts as a router to render the appropriate component for each message type.
 *
 * @param props - The component props.
 * @param props.message - The chat message object to render.
 */
export function ChatMessageComponent({ message }) {
  switch (message.type) {
    case "ai":
      return <AiChatMessageComponent message={message} />;
    case "user":
      return <UserChatMessageComponent message={message} />;
    case "checkpoint":
      return <CheckpointChatMessageComponent message={message} />;
    case "toolCall":
      switch (message.toolName) {
        case "plan":
          return <PlanChatMessageComponent plan={message.arguments.plan} />;
        case "ask_user":
          return (
            <AskUserChatMessageComponent
              question={message.arguments.question}
            />
          );
        case "finish_with_summary":
          return (
            <SummaryChatMessageComponent summary={message.arguments.summary} />
          );
        default:
          return <ToolCallChatMessageComponent name={message.toolName} />;
      }
    case "toolCallResult":
      if (message.isError) {
        return <ToolCallErrorChatMessageComponent name={message.toolName} />;
      }
      return null;
    default:
      return <div>Unknown message type</div>;
  }
}
