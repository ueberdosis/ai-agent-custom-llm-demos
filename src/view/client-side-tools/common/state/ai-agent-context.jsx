import { createContext, useCallback, useContext, useEffect, useRef, useState } from 'react'

/**
 * Context for providing the AiAgentProvider and Editor instances.
 */
export const AiAgentContext = createContext(null)

/**
 * Provides access to the AiAgentProvider instance and Editor instance throughout the React component tree.
 *
 * @param props - The component props.
 * @param props.children - The child components.
 * @param props.provider - The AiAgentProvider instance.
 * @param props.editor - The Tiptap Editor instance.
 */
export function AiAgentContextProvider({ children, provider, editor }) {
  return <AiAgentContext.Provider value={{ provider, editor }}>{children}</AiAgentContext.Provider>
}

/**
 * Custom hook to access the AiAgentContext value.
 *
 * @returns The context value containing the AiAgentProvider and Editor instances.
 * @throws {Error} If used outside of an AiAgentContextProvider.
 */
export function useAiAgentProvider() {
  const context = useContext(AiAgentContext)
  if (!context) {
    throw new Error('useAiAgentProvider must be used within AiAgentContextProvider')
  }
  return context
}

/**
 * Custom hook to access the state of the AiAgentProvider.
 *
 * @template T
 * @param [selector] - An optional selector function to extract a specific part of the state.
 * @returns The full state of the AiAgentProvider or the selected part of the state.
 */
export function useAiAgentProviderState(selector) {
  const selectorRef = useRef(selector)
  const { provider } = useAiAgentProvider()

  const getValue = useCallback(() => {
    return selectorRef.current ? selectorRef.current(provider.state) : provider.state
  }, [provider])

  const [state, setState] = useState(getValue)

  useEffect(() => {
    const callback = () => {
      setState(getValue())
    }

    provider.on('stateChange', callback)
    return () => provider.off('stateChange', callback)
  }, [provider, getValue])

  return state
}
