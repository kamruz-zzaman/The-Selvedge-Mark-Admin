export default function ShippingLoading() {
  return (
    <div className="space-y-6">
      <div className="h-20 w-full animate-pulse rounded-lg bg-secondary" />
      <div className="grid gap-6 lg:grid-cols-2">
        {[...Array(2)].map((_, i) => (
          <div key={i} className="h-64 w-full animate-pulse rounded-lg bg-secondary" />
        ))}
      </div>
      <div className="h-96 w-full animate-pulse rounded-lg bg-secondary" />
    </div>
  )
}
