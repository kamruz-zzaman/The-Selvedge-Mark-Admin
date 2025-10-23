import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { DollarSign, ShoppingCart, Users, Package, AlertCircle } from "lucide-react"

export default function AdminDashboard() {
  const metrics = [
    {
      title: "Total Revenue",
      value: "$45,231.89",
      change: "+20.1% from last month",
      icon: DollarSign,
    },
    {
      title: "Orders",
      value: "234",
      change: "18 pending, 12 processing",
      icon: ShoppingCart,
    },
    {
      title: "Customers",
      value: "1,429",
      change: "+48 new this week",
      icon: Users,
    },
    {
      title: "Products",
      value: "892",
      change: "12 low stock alerts",
      icon: Package,
    },
  ]

  const recentOrders = [
    { id: "#3210", customer: "John Smith", date: "2024-01-15", total: "$234.00", status: "Processing" },
    { id: "#3209", customer: "Sarah Johnson", date: "2024-01-15", total: "$189.50", status: "Shipped" },
    { id: "#3208", customer: "Mike Davis", date: "2024-01-14", total: "$456.00", status: "Delivered" },
    { id: "#3207", customer: "Emily Brown", date: "2024-01-14", total: "$123.00", status: "Pending" },
    { id: "#3206", customer: "Chris Wilson", date: "2024-01-13", total: "$789.00", status: "Processing" },
  ]

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-semibold text-foreground">Dashboard</h1>
        <p className="text-muted-foreground">Welcome back! Here's what's happening today.</p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {metrics.map((metric) => (
          <Card key={metric.title} className="border-border bg-card">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-card-foreground">{metric.title}</CardTitle>
              <metric.icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-card-foreground">{metric.value}</div>
              <p className="text-xs text-muted-foreground">{metric.change}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Card className="border-border bg-card">
          <CardHeader>
            <CardTitle className="text-card-foreground">Recent Orders</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentOrders.map((order) => (
                <div
                  key={order.id}
                  className="flex items-center justify-between border-b border-border pb-4 last:border-0 last:pb-0"
                >
                  <div className="space-y-1">
                    <p className="text-sm font-medium text-card-foreground">{order.id}</p>
                    <p className="text-xs text-muted-foreground">{order.customer}</p>
                  </div>
                  <div className="text-right space-y-1">
                    <p className="text-sm font-medium text-card-foreground">{order.total}</p>
                    <p className="text-xs text-muted-foreground">{order.status}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="border-border bg-card">
          <CardHeader>
            <CardTitle className="text-card-foreground">Quick Actions</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <button className="flex w-full items-center gap-3 rounded-lg border border-border bg-secondary p-3 text-left transition-colors hover:bg-secondary/80">
              <Package className="h-5 w-5 text-foreground" />
              <div>
                <p className="text-sm font-medium text-foreground">Add New Product</p>
                <p className="text-xs text-muted-foreground">Create a new product listing</p>
              </div>
            </button>
            <button className="flex w-full items-center gap-3 rounded-lg border border-border bg-secondary p-3 text-left transition-colors hover:bg-secondary/80">
              <ShoppingCart className="h-5 w-5 text-foreground" />
              <div>
                <p className="text-sm font-medium text-foreground">Process Orders</p>
                <p className="text-xs text-muted-foreground">View and manage pending orders</p>
              </div>
            </button>
            <button className="flex w-full items-center gap-3 rounded-lg border border-border bg-secondary p-3 text-left transition-colors hover:bg-secondary/80">
              <AlertCircle className="h-5 w-5 text-foreground" />
              <div>
                <p className="text-sm font-medium text-foreground">Low Stock Alerts</p>
                <p className="text-xs text-muted-foreground">12 products need restocking</p>
              </div>
            </button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
