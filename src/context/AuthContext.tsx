import { createContext, useCallback, useContext, useState, type ReactNode } from 'react'
import { MOCK_PASSCODE } from '@/data/mock'

interface AuthContextValue {
  unlocked: boolean
  unlock: (passcode: string) => boolean
  lock: () => void
}

const STORAGE_KEY = 'carbon:unlocked'
const AuthContext = createContext<AuthContextValue | null>(null)

function readUnlocked() {
  try {
    return sessionStorage.getItem(STORAGE_KEY) === '1'
  } catch {
    return false
  }
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [unlocked, setUnlocked] = useState(readUnlocked)

  const unlock = useCallback((passcode: string) => {
    const ok = passcode === MOCK_PASSCODE
    if (ok) {
      setUnlocked(true)
      try {
        sessionStorage.setItem(STORAGE_KEY, '1')
      } catch {
        // Storage unavailable (private mode) — session simply won't persist.
      }
    }
    return ok
  }, [])

  const lock = useCallback(() => {
    setUnlocked(false)
    try {
      sessionStorage.removeItem(STORAGE_KEY)
    } catch {
      // ignore
    }
  }, [])

  return <AuthContext.Provider value={{ unlocked, unlock, lock }}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used inside AuthProvider')
  return ctx
}
