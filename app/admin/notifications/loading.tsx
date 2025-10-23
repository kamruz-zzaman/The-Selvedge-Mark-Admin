export default function NotificationsLoading() {
  return (
    <div className="space-y-6">
      <div className="h-20 w-full animate-pulse rounded-lg bg-secondary" />
      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <div className="h-96 w-full animate-pulse rounded-lg bg-secondary" />
        </div>
        <div className="space-y-6">
          {[...Array(2)].map((_, i) => (
            <div key={i} className="h-64 w-full animate-pulse rounded-lg bg-secondary" />
          ))}
        </div>
      </div>
    </div>
  )
}
