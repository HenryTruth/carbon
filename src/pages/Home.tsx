import { Bell, Headset } from 'lucide-react'
import BalanceCard from '@/components/home/BalanceCard'
import QuickAccess from '@/components/home/QuickAccess'
import QuickActions from '@/components/home/QuickActions'
import TransactionList from '@/components/home/TransactionList'
import { account, transactions } from '@/data/mock'

// Share of onboarding steps completed; drives the progress line under the header.
const ONBOARDING_PROGRESS = 0.6

export default function Home() {
  const firstName = account.holderName.split(' ')[0]
  const initials = account.holderName
    .split(' ')
    .map((n) => n[0])
    .join('')

  return (
    <div className="motion-safe:animate-fade-up">
      <header>
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <span className="relative flex size-12 items-center justify-center rounded-full bg-surface-raised text-sm font-semibold text-brand ring-2 ring-brand ring-offset-2">
              {initials}
              <span
                aria-label={`Tier ${account.tier}`}
                className="absolute -right-1 -bottom-1 flex size-5 items-center justify-center rounded-md bg-[#b0275f] text-[10px] font-bold text-white ring-2 ring-white"
              >
                {account.tier}
              </span>
            </span>
            <h1 className="text-xl font-semibold">Hi {firstName}</h1>
          </div>
          <div className="flex gap-3">
            <button
              type="button"
              className="flex h-12 items-center gap-1.5 rounded-2xl bg-brand-soft px-3 transition hover:bg-surface-raised"
            >
              <Headset className="size-5 text-ink-muted" />
              <span className="rounded-full bg-[#d6336c] px-2 py-0.5 text-xs font-medium text-white">Help</span>
            </button>
            <button
              type="button"
              aria-label="Notifications"
              className="flex size-12 items-center justify-center rounded-2xl bg-brand-soft text-ink-muted transition hover:bg-surface-raised"
            >
              <Bell className="size-5" />
            </button>
          </div>
        </div>
        <div
          className="mt-3 h-0.5 rounded-full bg-line"
          role="progressbar"
          aria-label="Onboarding progress"
          aria-valuenow={ONBOARDING_PROGRESS * 100}
        >
          <div className="h-full rounded-full bg-brand" style={{ width: `${ONBOARDING_PROGRESS * 100}%` }} />
        </div>
      </header>

      <div className="mt-5 grid grid-cols-1 gap-5 lg:grid-cols-5 lg:gap-6">
        <div className="min-w-0 space-y-5 lg:col-span-2">
          <BalanceCard account={account} />
          <QuickActions />
          <QuickAccess />
        </div>
        <div className="min-w-0 lg:col-span-3">
          <TransactionList transactions={transactions} />
        </div>
      </div>
    </div>
  )
}
