import { cn } from '@/lib/cn'

interface LogoProps {
  className?: string
  showWordmark?: boolean
}

export default function Logo({ className, showWordmark = true }: LogoProps) {
  return (
    <span className={cn('inline-flex items-center gap-2.5', className)}>
      <svg viewBox="0 0 32 32" className="h-[1.6em] w-[1.6em]" aria-hidden="true">
        <rect width="32" height="32" rx="9" className="fill-surface-raised" />
        <path
          d="M21.5 11.2A7 7 0 1 0 21.5 20.8"
          fill="none"
          className="stroke-brand"
          strokeWidth="3.2"
          strokeLinecap="round"
        />
      </svg>
      {showWordmark && <span className="font-bold tracking-tight">carbon</span>}
    </span>
  )
}
