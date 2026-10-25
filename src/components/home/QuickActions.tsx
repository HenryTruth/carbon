import { ArrowDownLeft, ArrowUpRight, Receipt, Smartphone } from 'lucide-react'

const ACTIONS = [
  { label: 'Send', icon: ArrowUpRight },
  { label: 'Receive', icon: ArrowDownLeft },
  { label: 'Pay bills', icon: Receipt },
  { label: 'Airtime', icon: Smartphone },
]

export default function QuickActions() {
  return (
    <section aria-label="Quick actions" className="grid grid-cols-4 gap-2 sm:gap-3">
      {ACTIONS.map(({ label, icon: Icon }) => (
        <button
          key={label}
          type="button"
          className="group flex flex-col items-center gap-2 rounded-2xl bg-surface px-1 py-3.5 text-xs font-medium ring-1 ring-line transition hover:bg-surface-raised sm:text-sm"
        >
          <span className="flex size-10 items-center justify-center rounded-full bg-brand/10 text-brand transition group-hover:bg-brand group-hover:text-brand-ink">
            <Icon className="size-5" />
          </span>
          {label}
        </button>
      ))}
    </section>
  )
}
