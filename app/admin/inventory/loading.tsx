export default function InventoryLoading() {
  return (
    <div className="space-y-6">
      <div className="h-20 w-full animate-pulse rounded-lg bg-secondary" />
      <div className="grid gap-6 md:grid-cols-4">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="h-24 w-full animate-pulse rounded-lg bg-secondary" />
        ))}
      </div>
      <div className="h-96 w-full animate-pulse rounded-lg bg-secondary" />
    </div>
  )
}
