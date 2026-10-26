import { CreditCard, FileChartColumn, Receipt, Smartphone } from 'lucide-react'
import { Link } from 'react-router-dom'

const SERVICES = [
  { label: 'Credit Report', icon: FileChartColumn, to: '/loans', tint: 'bg-orange-100 text-orange-600' },
  { label: 'Cards', icon: CreditCard, to: '/cards', tint: 'bg-pink-100 text-pink-600' },
  { label: 'Pay Bills', icon: Receipt, to: '/payments', tint: 'bg-green-100 text-green-600' },
  { label: 'Buy Airtime', icon: Smartphone, to: '/payments', tint: 'bg-sky-100 text-sky-600' },
]

export default function QuickAccess() {
  return (
    <section className="rounded-3xl bg-surface p-5 shadow-[0_4px_24px_rgba(60,40,140,0.08)] ring-1 ring-line">
      <h2 className="font-semibold">Quick Access</h2>
      <div className="mt-4 grid grid-cols-4 gap-2 sm:gap-3">
        {SERVICES.map(({ label, icon: Icon, to, tint }) => (
          <Link
            key={label}
            to={to}
            className="flex flex-col items-center gap-2 rounded-2xl bg-[#f7f6fb] px-1 py-4 text-center text-xs font-medium transition hover:bg-surface-raised sm:text-sm"
          >
            <span className={`flex size-10 items-center justify-center rounded-xl ${tint}`}>
              <Icon className="size-5" />
            </span>
            {label}
          </Link>
        ))}
      </div>
    </section>
  )
}
