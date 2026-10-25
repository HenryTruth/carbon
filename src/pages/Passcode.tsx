import { useCallback, useEffect, useState } from 'react'
import { Navigate, useNavigate } from 'react-router-dom'
import { Delete, Fingerprint } from 'lucide-react'
import Logo from '@/components/Logo'
import { useAuth } from '@/context/AuthContext'
import { account } from '@/data/mock'
import { cn } from '@/lib/cn'

const PASSCODE_LENGTH = 5
const KEYS = ['1', '2', '3', '4', '5', '6', '7', '8', '9', 'bio', '0', 'del'] as const

export default function Passcode() {
  const navigate = useNavigate()
  const { unlocked, unlock } = useAuth()
  const [digits, setDigits] = useState('')
  const [error, setError] = useState(false)

  const press = useCallback(
    (key: string) => {
      if (key === 'del') {
        setError(false)
        setDigits((d) => d.slice(0, -1))
        return
      }
      setError(false)
      setDigits((d) => (d.length < PASSCODE_LENGTH ? d + key : d))
    },
    [],
  )

  // Verify once the fifth digit lands.
  useEffect(() => {
    if (digits.length !== PASSCODE_LENGTH) return
    const timer = setTimeout(() => {
      if (unlock(digits)) {
        navigate('/home', { replace: true })
      } else {
        setError(true)
        setDigits('')
        navigator.vibrate?.(200)
      }
    }, 150)
    return () => clearTimeout(timer)
  }, [digits, unlock, navigate])

  // Physical keyboard support for desktop.
  useEffect(() => {
    function onKeyDown(e: KeyboardEvent) {
      if (/^\d$/.test(e.key)) press(e.key)
      else if (e.key === 'Backspace') press('del')
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [press])

  if (unlocked) return <Navigate to="/home" replace />

  const firstName = account.holderName.split(' ')[0]

  return (
    <div className="flex min-h-dvh items-center justify-center px-4 py-8">
      <div className="flex w-full max-w-sm flex-col items-center motion-safe:animate-fade-up">
        <Logo className="text-xl" />

        <div className="mt-10 flex size-16 items-center justify-center rounded-full bg-surface-raised text-xl font-semibold">
          {account.holderName
            .split(' ')
            .map((n) => n[0])
            .join('')}
        </div>
        <h1 className="mt-4 text-xl font-semibold sm:text-2xl">Welcome back, {firstName}</h1>
        <p className="mt-1 text-sm text-ink-muted">Enter your 5-digit passcode</p>

        <div
          className={cn('mt-8 flex gap-4', error && 'motion-safe:animate-shake')}
          role="status"
          aria-label={`${digits.length} of ${PASSCODE_LENGTH} digits entered`}
        >
          {Array.from({ length: PASSCODE_LENGTH }, (_, i) => (
            <span
              key={i}
              className={cn(
                'size-4 rounded-full border-2 transition-all duration-150',
                error
                  ? 'border-danger'
                  : i < digits.length
                    ? 'scale-110 border-brand bg-brand'
                    : 'border-line',
              )}
            />
          ))}
        </div>
        <p className={cn('mt-4 h-5 text-sm text-danger', !error && 'invisible')} aria-live="polite">
          Incorrect passcode. Try again.
        </p>

        <div className="mt-6 grid w-full grid-cols-3 gap-3 sm:gap-4">
          {KEYS.map((key) => {
            if (key === 'bio') {
              return (
                <button
                  key={key}
                  type="button"
                  aria-label="Use biometrics"
                  className="flex aspect-[1.6] items-center justify-center rounded-2xl text-ink-muted transition hover:text-brand"
                >
                  <Fingerprint className="size-7" />
                </button>
              )
            }
            if (key === 'del') {
              return (
                <button
                  key={key}
                  type="button"
                  aria-label="Delete"
                  onClick={() => press('del')}
                  className="flex aspect-[1.6] items-center justify-center rounded-2xl text-ink-muted transition hover:text-ink active:scale-95"
                >
                  <Delete className="size-6" />
                </button>
              )
            }
            return (
              <button
                key={key}
                type="button"
                onClick={() => press(key)}
                className="flex aspect-[1.6] items-center justify-center rounded-2xl bg-surface text-2xl font-medium transition hover:bg-surface-raised active:scale-95 active:bg-line"
              >
                {key}
              </button>
            )
          })}
        </div>

        <button type="button" className="mt-8 text-sm font-medium text-brand hover:underline">
          Forgot passcode?
        </button>
        <p className="mt-3 text-xs text-ink-muted/70">Demo passcode: 12345</p>
      </div>
    </div>
  )
}
