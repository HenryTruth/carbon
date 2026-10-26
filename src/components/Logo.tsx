import { useId } from 'react'
import { cn } from '@/lib/cn'

interface LogoProps {
  className?: string
  showWordmark?: boolean
}

export default function Logo({ className, showWordmark = true }: LogoProps) {
  const gradientId = useId()

  // Mirrors public/favicon.svg so the in-app mark matches the home-screen icon.
  return (
    <span className={cn('inline-flex items-center gap-2.5', className)}>
      <svg viewBox="0 0 32 32" className="h-[1.6em] w-[1.6em]" aria-hidden="true">
        <defs>
          <linearGradient id={gradientId} x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="#5b2ee0" />
            <stop offset=".55" stopColor="#6d3df0" />
            <stop offset="1" stopColor="#8b5cf6" />
          </linearGradient>
        </defs>
        <rect width="32" height="32" rx="9" fill={`url(#${gradientId})`} />
        <path
          d="M21.5 11.2A7 7 0 1 0 21.5 20.8"
          fill="none"
          stroke="#ffffff"
          strokeWidth="3.2"
          strokeLinecap="round"
        />
      </svg>
      {showWordmark && <span className="font-bold tracking-tight">carbon</span>}
    </span>
  )
}
