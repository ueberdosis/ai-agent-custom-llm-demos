import { createContext, useContext, useState } from 'react'

import { businessUseCases } from '../constants/business-use-cases.js'

/**
 * Context for providing the user message state and setter function.
 */
export const UserMessageContext = createContext(null)

/**
 * Provides the state and setter function for the user's chat message throughout the React component tree.
 *
 * @param props - The component props.
 * @param props.children - The child components.
 */
export function UserMessageProvider({ children }) {
  const [message, setMessage] = useState(businessUseCases[0].prompt)

  return <UserMessageContext.Provider value={{ message, setMessage }}>{children}</UserMessageContext.Provider>
}

/**
 * Custom hook to access the UserMessageContext value.
 *
 * @returns The context value containing the user message state and setter.
 * @throws {Error} If used outside of a UserMessageProvider.
 */
export function useUserMessageProvider() {
  const context = useContext(UserMessageContext)
  if (!context) {
    throw new Error('useUserMessageProvider must be used within UserMessageProvider')
  }
  return context
}
