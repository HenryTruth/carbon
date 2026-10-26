import { ArrowLeftRight, BriefcaseBusiness, CircleUserRound, HandCoins, Hexagon, Lock } from 'lucide-react'
import { Navigate, NavLink, Outlet } from 'react-router-dom'
import Logo from '@/components/Logo'
import { useAuth } from '@/context/AuthContext'
import { cn } from '@/lib/cn'

// Only Home has a screen so far; the rest are placeholders for upcoming pages.
const NAV = [
  { to: '/home', label: 'Home', icon: Hexagon },
  { to: '/savings', label: 'Savings', icon: BriefcaseBusiness },
  { to: '/payments', label: 'Payments', icon: ArrowLeftRight },
  { to: '/loans', label: 'Loans', icon: HandCoins },
  { to: '/account', label: 'Account', icon: CircleUserRound },
]

export default function AppLayout() {
  const { unlocked, lock } = useAuth()
  if (!unlocked) return <Navigate to="/unlock" replace />

  return (
    <div className="min-h-dvh lg:flex">
      {/* Desktop sidebar */}
      <aside className="sticky top-0 hidden h-dvh w-64 shrink-0 flex-col border-r border-line bg-surface/50 p-6 lg:flex">
        <Logo className="text-xl" />
        <nav className="mt-10 flex flex-1 flex-col gap-1">
          {NAV.map(({ to, label, icon: Icon }) => (
            <NavLink
              key={to}
              to={to}
              className={({ isActive }) =>
                cn(
                  'flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition',
                  isActive ? 'bg-brand-soft text-brand' : 'text-ink-muted hover:bg-surface-raised hover:text-ink',
                )
              }
            >
              <Icon className="size-5" />
              {label}
            </NavLink>
          ))}
        </nav>
        <button
          type="button"
          onClick={lock}
          className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-ink-muted transition hover:bg-surface-raised hover:text-ink"
        >
          <Lock className="size-5" />
          Lock app
        </button>
      </aside>

      <main className="mx-auto w-full max-w-6xl px-4 pt-6 pb-32 sm:px-6 lg:px-10 lg:pt-10 lg:pb-10">
        <Outlet />
      </main>

      {/* Mobile / tablet bottom nav */}
      <nav className="fixed inset-x-0 bottom-0 z-20 border-t border-line bg-white/95 pb-[env(safe-area-inset-bottom)] shadow-[0_-4px_20px_rgba(60,40,140,0.06)] backdrop-blur-lg lg:hidden">
        <ul className="mx-auto grid max-w-lg grid-cols-5 px-2 py-2">
          {NAV.map(({ to, label, icon: Icon }) => (
            <li key={to}>
              <NavLink to={to} className="group flex flex-col items-center gap-1 text-xs font-medium">
                {({ isActive }) => (
                  <>
                    <span
                      className={cn(
                        'flex h-8 w-full max-w-16 items-center justify-center rounded-full transition',
                        isActive ? 'bg-brand-soft text-brand' : 'text-ink-muted group-hover:text-ink',
                      )}
                    >
                      <Icon className="size-5" />
                    </span>
                    <span className={isActive ? 'text-brand' : 'text-ink-muted'}>{label}</span>
                  </>
                )}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  )
}
