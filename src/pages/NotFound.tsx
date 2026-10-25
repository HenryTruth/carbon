import { Link } from 'react-router-dom'

export default function NotFound() {
  return (
    <div className="flex min-h-dvh flex-col items-center justify-center gap-2 p-4">
      <p className="text-ink-muted">Page not found</p>
      <Link to="/" className="text-brand underline">
        Go home
      </Link>
    </div>
  )
}
