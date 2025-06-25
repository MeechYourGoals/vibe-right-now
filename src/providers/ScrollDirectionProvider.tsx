import React from 'react'
import { useScrollDirectionInternal } from '@/hooks/useScrollDirection'

const ScrollDirectionContext = React.createContext<'up' | 'down' | 'idle'>('idle')

export const ScrollDirectionProvider = ({ children }: { children: React.ReactNode }) => {
  const direction = useScrollDirectionInternal()
  return <ScrollDirectionContext.Provider value={direction}>{children}</ScrollDirectionContext.Provider>
}

export const useScrollDirection = () => React.useContext(ScrollDirectionContext)

