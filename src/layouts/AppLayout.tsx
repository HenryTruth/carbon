import { CreditCard, House, Lock, Send, UserRound } from 'lucide-react'
import { Navigate, NavLink, Outlet } from 'react-router-dom'
import Logo from '@/components/Logo'
import { useAuth } from '@/context/AuthContext'
import { cn } from '@/lib/cn'

// Only Home has a screen so far; the rest are placeholders for upcoming pages.
const NAV = [
  { to: '/home', label: 'Home', icon: House },
  { to: '/cards', label: 'Cards', icon: CreditCard },
  { to: '/payments', label: 'Payments', icon: Send },
  { to: '/profile', label: 'Profile', icon: UserRound },
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
                  isActive ? 'bg-brand/10 text-brand' : 'text-ink-muted hover:bg-surface-raised hover:text-ink',
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

      <main className="mx-auto w-full max-w-6xl px-4 pt-6 pb-28 sm:px-6 lg:px-10 lg:pt-10 lg:pb-10">
        <Outlet />
      </main>

      {/* Mobile / tablet bottom nav */}
      <nav className="fixed inset-x-0 bottom-0 z-20 border-t border-line bg-canvas/90 pb-[env(safe-area-inset-bottom)] backdrop-blur-lg lg:hidden">
        <ul className="mx-auto flex max-w-lg justify-around">
          {NAV.map(({ to, label, icon: Icon }) => (
            <li key={to}>
              <NavLink
                to={to}
                className={({ isActive }) =>
                  cn(
                    'flex flex-col items-center gap-1 px-4 py-3 text-[11px] font-medium transition',
                    isActive ? 'text-brand' : 'text-ink-muted hover:text-ink',
                  )
                }
              >
                <Icon className="size-5" />
                {label}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  )
}
