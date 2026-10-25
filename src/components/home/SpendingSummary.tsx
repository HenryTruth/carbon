import type { Transaction } from '@/types'
import { formatCurrency } from '@/lib/format'

export default function SpendingSummary({ transactions }: { transactions: Transaction[] }) {
  const settled = transactions.filter((t) => t.status !== 'failed')
  const moneyIn = settled.filter((t) => t.amount > 0).reduce((sum, t) => sum + t.amount, 0)
  const moneyOut = settled.filter((t) => t.amount < 0).reduce((sum, t) => sum - t.amount, 0)
  const inShare = moneyIn + moneyOut === 0 ? 0 : (moneyIn / (moneyIn + moneyOut)) * 100

  return (
    <section className="rounded-3xl bg-surface p-5 ring-1 ring-line">
      <h2 className="text-sm font-semibold">This month</h2>
      <div className="mt-4 grid grid-cols-2 gap-4">
        <div>
          <p className="text-xs text-ink-muted">Money in</p>
          <p className="mt-1 font-semibold text-success tabular-nums">{formatCurrency(moneyIn)}</p>
        </div>
        <div>
          <p className="text-xs text-ink-muted">Money out</p>
          <p className="mt-1 font-semibold tabular-nums">{formatCurrency(moneyOut)}</p>
        </div>
      </div>
      <div className="mt-4 flex h-2 gap-1 overflow-hidden rounded-full">
        <span className="rounded-full bg-brand" style={{ width: `${inShare}%` }} />
        <span className="flex-1 rounded-full bg-line" />
      </div>
    </section>
  )
}
