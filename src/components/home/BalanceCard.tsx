import { useState } from 'react'
import { Check, Copy, Eye, EyeOff } from 'lucide-react'
import type { Account } from '@/types'
import { formatCurrency, formatShortDate, maskAccountNumber } from '@/lib/format'

const HIDDEN = '₦ ••••••'

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

  const money = (amount: number) => (hidden ? HIDDEN : formatCurrency(amount, account.currency))

  // Three cards stacked like a wallet: each one tucks under the next.
  return (
    <section aria-label="Accounts" className="flex flex-col">
      <div className="flex items-center justify-between rounded-t-3xl bg-gradient-to-r from-[#c2255c] to-[#e8508a] px-6 pt-4 pb-9 text-white shadow-sm">
        <p className="text-sm text-white/90">Savings</p>
        <p className="text-lg font-bold tabular-nums">{money(account.savingsBalance)}</p>
      </div>

      <div className="-mt-6 flex items-center justify-between rounded-t-3xl border-t border-white/30 bg-gradient-to-r from-[#17806f] to-[#2bb39c] px-6 pt-4 pb-9 text-white shadow-sm">
        <p className="text-sm text-white/90">Available Credit</p>
        <p className="text-lg font-bold tabular-nums">{money(account.availableCredit)}</p>
      </div>

      <div className="relative -mt-6 overflow-hidden rounded-3xl border-t border-white/30 bg-gradient-to-br from-[#5b2ee0] via-[#6d3df0] to-[#8b5cf6] p-6 text-white shadow-lg shadow-brand/25">
        <div
          aria-hidden="true"
          className="absolute -right-24 -bottom-40 size-96 rounded-full border border-white/15 bg-white/5"
        />

        <div className="relative flex items-center justify-between gap-4">
          <p className="text-sm text-white/90">Main Account</p>
          <span className="rounded bg-[#3fbf5f] px-2.5 py-0.5 text-xs font-medium">{account.status}</span>
        </div>

        <div className="relative mt-3 flex items-center gap-3">
          <p className="text-2xl font-bold tracking-tight tabular-nums sm:text-3xl">{money(account.balance)}</p>
          <button
            type="button"
            onClick={() => setHidden((h) => !h)}
            aria-label={hidden ? 'Show balances' : 'Hide balances'}
            className="flex size-8 items-center justify-center rounded-full bg-white/20 transition hover:bg-white/30"
          >
            {hidden ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
          </button>
        </div>
        <p className="relative mt-1 text-xs text-white/80">Last updated {formatShortDate(account.lastUpdated)}</p>

        <div className="relative mt-5 flex items-center gap-3 text-sm text-white/90">
          <span>
            Account number: <span className="tracking-wide tabular-nums">{maskAccountNumber(account.accountNumber)}</span>
          </span>
          <button
            type="button"
            onClick={copyAccountNumber}
            aria-label={copied ? 'Copied' : 'Copy account number'}
            className="flex size-8 items-center justify-center rounded-lg bg-white/20 transition hover:bg-white/30"
          >
            {copied ? <Check className="size-4" /> : <Copy className="size-4" />}
          </button>
        </div>
      </div>
    </section>
  )
}
