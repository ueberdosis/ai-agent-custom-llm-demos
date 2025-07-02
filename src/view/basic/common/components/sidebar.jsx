import { useAiAgentProvider } from '../state/ai-agent-context.jsx'
import { SidebarFooter } from './sidebar-footer.jsx'
import { SidebarMain } from './sidebar-main.jsx'

export function Sidebar() {
  const { provider } = useAiAgentProvider()
  return (
    <div className={`sidebar`}>
      <div className="sidebar-header">
        <div className="label-large">Tiptap AI Agent</div>
        <div className="button-group">
          <button type="button" onClick={() => provider.reset()}>
            New chat
          </button>
        </div>
      </div>
      <SidebarMain />
      <SidebarFooter />
    </div>
  )
}
