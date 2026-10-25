import { Link } from 'react-router-dom'

export default function ComingSoon() {
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center gap-2 text-center">
      <p className="font-semibold">Coming soon</p>
      <p className="text-sm text-ink-muted">This screen hasn’t been built yet.</p>
      <Link to="/home" className="mt-2 text-sm font-medium text-brand hover:underline">
        Back to home
      </Link>
    </div>
  )
}
