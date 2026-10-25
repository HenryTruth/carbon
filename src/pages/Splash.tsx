import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import Logo from '@/components/Logo'
import { useAuth } from '@/context/AuthContext'

const SPLASH_DURATION_MS = 2200

export default function Splash() {
  const navigate = useNavigate()
  const { unlocked } = useAuth()

  useEffect(() => {
    const timer = setTimeout(
      () => navigate(unlocked ? '/home' : '/unlock', { replace: true }),
      SPLASH_DURATION_MS,
    )
    return () => clearTimeout(timer)
  }, [navigate, unlocked])

  return (
    <div className="relative flex min-h-dvh flex-col items-center justify-center overflow-hidden">
      <div
        aria-hidden="true"
        className="absolute size-[36rem] rounded-full bg-brand/10 blur-3xl motion-safe:animate-pulse"
      />
      <Logo className="relative text-4xl motion-safe:animate-logo sm:text-5xl" />
      <p className="relative mt-4 text-sm text-ink-muted motion-safe:animate-fade-up [animation-delay:400ms]">
        Banking, simplified.
      </p>

      <div className="absolute bottom-10 h-1 w-24 overflow-hidden rounded-full bg-line">
        <div className="h-full origin-left rounded-full bg-brand motion-safe:animate-[grow_2s_ease-out_forwards]" />
      </div>
      <style>{'@keyframes grow{from{transform:scaleX(0)}to{transform:scaleX(1)}}'}</style>
    </div>
  )
}
