import { Bell } from 'lucide-react'
import BalanceCard from '@/components/home/BalanceCard'
import QuickActions from '@/components/home/QuickActions'
import SpendingSummary from '@/components/home/SpendingSummary'
import TransactionList from '@/components/home/TransactionList'
import { account, transactions } from '@/data/mock'
import { greeting } from '@/lib/format'

export default function Home() {
  const firstName = account.holderName.split(' ')[0]
  const initials = account.holderName
    .split(' ')
    .map((n) => n[0])
    .join('')

  return (
    <div className="motion-safe:animate-fade-up">
      <header className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <span className="flex size-11 items-center justify-center rounded-full bg-surface-raised text-sm font-semibold ring-1 ring-line">
            {initials}
          </span>
          <div>
            <p className="text-xs text-ink-muted sm:text-sm">{greeting()},</p>
            <h1 className="font-semibold sm:text-lg">{firstName}</h1>
          </div>
        </div>
        <button
          type="button"
          aria-label="Notifications"
          className="relative flex size-11 items-center justify-center rounded-full bg-surface ring-1 ring-line transition hover:bg-surface-raised"
        >
          <Bell className="size-5" />
          <span className="absolute top-2.5 right-3 size-2 rounded-full bg-brand" />
        </button>
      </header>

      <div className="mt-6 grid grid-cols-1 gap-5 lg:grid-cols-5 lg:gap-6">
        <div className="min-w-0 space-y-5 lg:col-span-2">
          <BalanceCard account={account} />
          <QuickActions />
          <SpendingSummary transactions={transactions} />
        </div>
        <div className="min-w-0 lg:col-span-3">
          <TransactionList transactions={transactions} />
        </div>
      </div>
    </div>
  )
}
