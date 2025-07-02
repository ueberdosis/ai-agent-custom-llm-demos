import "./styles.scss";

import { Decoration } from "@tiptap/pm/view";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import AiAgent, { AiAgentProvider } from "@tiptap-pro/extension-ai-agent";
import AiChanges from "@tiptap-pro/extension-ai-changes";
import { useState } from "react";

import { BusinessUseCasesMenu } from "./components/business-use-cases-menu.jsx";
import { MenuBar } from "./components/menu-bar.jsx";
import { ReviewChangePopover } from "./components/review-change-popover.jsx";
import { Sidebar } from "./components/sidebar.jsx";
import { businessUseCases } from "./constants/business-use-cases.js";
import { AiAgentContextProvider } from "./state/ai-agent-context.jsx";
import { UserMessageProvider } from "./state/user-message-context.jsx";

export default function App({ provider }) {
  const [tooltipElement, setTooltipElement] = useState(null);

  const editor = useEditor({
    immediatelyRender: false,
    shouldRerenderOnTransaction: true,
    content: businessUseCases[0].editorContent,
    extensions: [
      StarterKit,
      AiAgent.configure({
        provider,
      }),
      AiChanges.configure({
        getCustomDecorations({ change, isSelected, getDefaultDecorations }) {
          const decorations = getDefaultDecorations();

          if (isSelected) {
            decorations.push(
              Decoration.widget(change.newRange.to, () => {
                const element = document.createElement("span");

                setTooltipElement(element);
                return element;
              })
            );
          }
          return decorations;
        },
      }),
    ],
  });

  if (!editor) {
    return null;
  }

  return (
    <UserMessageProvider>
      <AiAgentContextProvider editor={editor} provider={provider}>
        <BusinessUseCasesMenu />
        <div className="col-group">
          <div className="main">
            <MenuBar />
            <EditorContent editor={editor} />
          </div>
          <Sidebar />
        </div>
        <ReviewChangePopover element={tooltipElement} />
      </AiAgentContextProvider>
    </UserMessageProvider>
  );
}
