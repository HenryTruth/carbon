import { useMemo, useState } from 'react'
import {
  ArrowDownLeft,
  ArrowUpRight,
  Car,
  Clapperboard,
  Receipt,
  ShoppingBag,
  Smartphone,
  Utensils,
  type LucideIcon,
} from 'lucide-react'
import type { Transaction, TransactionCategory } from '@/types'
import { cn } from '@/lib/cn'
import { formatCurrency, formatDayLabel, formatTime } from '@/lib/format'

const CATEGORY_ICONS: Record<TransactionCategory, LucideIcon> = {
  income: ArrowDownLeft,
  transfer: ArrowUpRight,
  food: Utensils,
  shopping: ShoppingBag,
  bills: Receipt,
  airtime: Smartphone,
  entertainment: Clapperboard,
  transport: Car,
}

const FILTERS = [
  { id: 'all', label: 'All' },
  { id: 'in', label: 'Money in' },
  { id: 'out', label: 'Money out' },
] as const

type Filter = (typeof FILTERS)[number]['id']

export default function TransactionList({ transactions }: { transactions: Transaction[] }) {
  const [filter, setFilter] = useState<Filter>('all')

  const groups = useMemo(() => {
    const filtered = transactions
      .filter((t) => (filter === 'in' ? t.amount > 0 : filter === 'out' ? t.amount < 0 : true))
      .sort((a, b) => b.date.localeCompare(a.date))

    const byDay = new Map<string, Transaction[]>()
    for (const t of filtered) {
      const label = formatDayLabel(t.date)
      byDay.set(label, [...(byDay.get(label) ?? []), t])
    }
    return [...byDay.entries()]
  }, [transactions, filter])

  return (
    <section className="rounded-3xl bg-surface p-4 ring-1 ring-line sm:p-5">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h2 className="font-semibold">Transaction history</h2>
        <div className="flex rounded-full bg-canvas p-1 text-xs font-medium" role="tablist">
          {FILTERS.map((f) => (
            <button
              key={f.id}
              type="button"
              role="tab"
              aria-selected={filter === f.id}
              onClick={() => setFilter(f.id)}
              className={cn(
                'rounded-full px-3 py-1.5 transition',
                filter === f.id ? 'bg-surface-raised text-ink' : 'text-ink-muted hover:text-ink',
              )}
            >
              {f.label}
            </button>
          ))}
        </div>
      </div>

      {groups.length === 0 ? (
        <p className="py-10 text-center text-sm text-ink-muted">No transactions yet.</p>
      ) : (
        <div className="mt-2">
          {groups.map(([day, items]) => (
            <div key={day}>
              <h3 className="sticky top-0 z-10 bg-surface pt-4 pb-2 text-xs font-medium text-ink-muted">
                {day}
              </h3>
              <ul>
                {items.map((t) => (
                  <TransactionRow key={t.id} transaction={t} />
                ))}
              </ul>
            </div>
          ))}
        </div>
      )}
    </section>
  )
}

function TransactionRow({ transaction: t }: { transaction: Transaction }) {
  const Icon = CATEGORY_ICONS[t.category]
  const isCredit = t.amount > 0

  return (
    <li className="-mx-2 flex items-center gap-3 rounded-2xl px-2 py-2.5 transition hover:bg-surface-raised">
      <span
        className={cn(
          'flex size-10 shrink-0 items-center justify-center rounded-full',
          isCredit ? 'bg-brand/10 text-brand' : 'bg-surface-raised text-ink-muted',
        )}
      >
        <Icon className="size-[18px]" />
      </span>
      <div className="min-w-0 flex-1">
        <p className="truncate text-sm font-medium">{t.title}</p>
        <p className="mt-0.5 text-xs text-ink-muted capitalize">
          {t.category} · {formatTime(t.date)}
        </p>
      </div>
      <div className="shrink-0 text-right">
        <p
          className={cn(
            'text-sm font-semibold tabular-nums',
            t.status === 'failed' ? 'text-ink-muted line-through' : isCredit ? 'text-success' : 'text-ink',
          )}
        >
          {isCredit ? '+' : '−'}
          {formatCurrency(Math.abs(t.amount))}
        </p>
        {t.status !== 'successful' && (
          <p
            className={cn(
              'mt-0.5 text-[11px] font-medium capitalize',
              t.status === 'pending' ? 'text-amber-400' : 'text-danger',
            )}
          >
            {t.status}
          </p>
        )}
      </div>
    </li>
  )
}
