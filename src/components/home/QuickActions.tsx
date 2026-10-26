import { ArrowUpRight, Plus } from 'lucide-react'

const ACTIONS = [
  { label: 'Add money', icon: Plus },
  { label: 'Send money', icon: ArrowUpRight },
]

export default function QuickActions() {
  return (
    <section aria-label="Quick actions" className="grid grid-cols-2 gap-3 sm:gap-4">
      {ACTIONS.map(({ label, icon: Icon }) => (
        <button
          key={label}
          type="button"
          className="group flex items-center justify-center gap-3 rounded-full bg-brand-soft px-4 py-4 text-sm font-semibold text-brand transition hover:bg-surface-raised active:scale-[0.98] sm:text-base"
        >
          <span className="flex size-7 items-center justify-center rounded-full bg-brand/70 text-white transition group-hover:bg-brand">
            <Icon className="size-4" strokeWidth={2.5} />
          </span>
          {label}
        </button>
      ))}
    </section>
  )
}
