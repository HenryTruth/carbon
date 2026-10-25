import { useState } from 'react'
import { Check, Copy, Eye, EyeOff } from 'lucide-react'
import type { Account } from '@/types'
import { formatCurrency, maskAccountNumber } from '@/lib/format'

export default function BalanceCard({ account }: { account: Account }) {
  const [hidden, setHidden] = useState(false)
  const [copied, setCopied] = useState(false)

  async function copyAccountNumber() {
    try {
      await navigator.clipboard.writeText(account.accountNumber)
      setCopied(true)
      setTimeout(() => setCopied(false), 1500)
    } catch {
      // Clipboard blocked — nothing to do.
    }
  }

  return (
    <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#1d2a24] via-surface-raised to-surface p-5 ring-1 ring-line sm:p-6">
      <div aria-hidden="true" className="absolute -top-20 -right-16 size-56 rounded-full bg-brand/15 blur-3xl" />

      <div className="relative flex items-start justify-between gap-4">
        <div className="min-w-0">
          <p className="text-xs font-medium tracking-wide text-ink-muted uppercase">{account.bankName}</p>
          <p className="mt-1 truncate font-semibold">{account.holderName}</p>
        </div>
        <span className="shrink-0 rounded-full bg-brand/15 px-2.5 py-1 text-xs font-medium text-brand">
          {account.accountType}
        </span>
      </div>

      <div className="relative mt-6">
        <div className="flex items-center gap-2 text-sm text-ink-muted">
          Available balance
          <button
            type="button"
            onClick={() => setHidden((h) => !h)}
            aria-label={hidden ? 'Show balance' : 'Hide balance'}
            className="rounded-full p-1 transition hover:bg-white/5 hover:text-ink"
          >
            {hidden ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
          </button>
        </div>
        <p className="mt-1 text-3xl font-bold tracking-tight tabular-nums sm:text-4xl">
          {hidden ? '₦ ••••••' : formatCurrency(account.balance, account.currency)}
        </p>
      </div>

      <div className="relative mt-6 flex items-center justify-between border-t border-white/5 pt-4">
        <div>
          <p className="text-xs text-ink-muted">Account number</p>
          <p className="mt-0.5 font-medium tracking-wider tabular-nums">
            {maskAccountNumber(account.accountNumber)}
          </p>
        </div>
        <button
          type="button"
          onClick={copyAccountNumber}
          className="inline-flex items-center gap-1.5 rounded-full bg-white/5 px-3 py-1.5 text-xs font-medium transition hover:bg-white/10"
        >
          {copied ? <Check className="size-3.5 text-brand" /> : <Copy className="size-3.5" />}
          {copied ? 'Copied' : 'Copy'}
        </button>
      </div>
    </section>
  )
}
