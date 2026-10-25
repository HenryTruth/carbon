import {
  Banknote,
  HandCoins,
  PiggyBank,
  ShieldCheck,
  TrendingUp,
  Tv,
  Wifi,
  Zap,
} from 'lucide-react'

const SERVICES = [
  { label: 'Data', icon: Wifi },
  { label: 'Electricity', icon: Zap },
  { label: 'Cable TV', icon: Tv },
  { label: 'Withdraw', icon: Banknote },
  { label: 'Savings', icon: PiggyBank },
  { label: 'Loans', icon: HandCoins },
  { label: 'Invest', icon: TrendingUp },
  { label: 'Insurance', icon: ShieldCheck },
]

export default function QuickAccess() {
  return (
    <section className="rounded-3xl bg-surface p-5 ring-1 ring-line">
      <h2 className="text-sm font-semibold">Quick access</h2>
      <div className="mt-4 grid grid-cols-4 gap-x-2 gap-y-4">
        {SERVICES.map(({ label, icon: Icon }) => (
          <button
            key={label}
            type="button"
            className="group flex flex-col items-center gap-2 rounded-xl py-1 text-[11px] font-medium text-ink-muted transition hover:text-ink sm:text-xs"
          >
            <span className="flex size-11 items-center justify-center rounded-2xl bg-surface-raised text-ink transition group-hover:bg-brand/10 group-hover:text-brand">
              <Icon className="size-5" />
            </span>
            {label}
          </button>
        ))}
      </div>
    </section>
  )
}
