"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  DollarSign,
  ShoppingCart,
  Users,
  Package,
  AlertCircle,
} from "lucide-react";
import { dashboardApi } from "@/lib/api/dashboard";

export default function AdminDashboard() {
  const [stats, setStats] = useState<any>(null);
  const [recentOrders, setRecentOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [statsRes, ordersRes] = await Promise.all([
          dashboardApi.getStats(),
          dashboardApi.getRecentOrders(5),
        ]);
        setStats(statsRes.data);
        setRecentOrders(ordersRes.data);
      } catch (error) {
        console.error("Failed to fetch dashboard data:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <p className="text-muted-foreground">Loading dashboard...</p>
      </div>
    );
  }

  if (!stats) {
    return (
      <div className="flex items-center justify-center h-64">
        <p className="text-destructive">Failed to load dashboard data</p>
      </div>
    );
  }

  const metrics = [
    {
      title: "Total Revenue",
      value: `$${stats.revenue.total.toLocaleString()}`,
      change: stats.revenue.change,
      icon: DollarSign,
    },
    {
      title: "Orders",
      value: stats.orders.total.toString(),
      change: `${stats.orders.pending} pending, ${stats.orders.processing} processing`,
      icon: ShoppingCart,
    },
    {
      title: "Customers",
      value: stats.customers.total.toLocaleString(),
      change: `+${stats.customers.newThisWeek} new this week`,
      icon: Users,
    },
    {
      title: "Products",
      value: stats.products.total.toString(),
      change: `${stats.products.lowStock} low stock alerts`,
      icon: Package,
    },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-semibold text-foreground">Dashboard</h1>
        <p className="text-muted-foreground">
          Welcome back! Here's what's happening today.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {metrics.map((metric) => (
          <Card key={metric.title} className="border-border bg-card">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-card-foreground">
                {metric.title}
              </CardTitle>
              <metric.icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-card-foreground">
                {metric.value}
              </div>
              <p className="text-xs text-muted-foreground">{metric.change}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Card className="border-border bg-card">
          <CardHeader>
            <CardTitle className="text-card-foreground">
              Recent Orders
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentOrders.map((order) => (
                <div
                  key={order.id}
                  className="flex items-center justify-between border-b border-border pb-4 last:border-0 last:pb-0"
                >
                  <div className="space-y-1">
                    <p className="text-sm font-medium text-card-foreground">
                      {order.id}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {order.customer}
                    </p>
                  </div>
                  <div className="text-right space-y-1">
                    <p className="text-sm font-medium text-card-foreground">
                      {order.total}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {order.status}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="border-border bg-card">
          <CardHeader>
            <CardTitle className="text-card-foreground">
              Quick Actions
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <button className="flex w-full items-center gap-3 rounded-lg border border-border bg-secondary p-3 text-left transition-colors hover:bg-secondary/80">
              <Package className="h-5 w-5 text-foreground" />
              <div>
                <p className="text-sm font-medium text-foreground">
                  Add New Product
                </p>
                <p className="text-xs text-muted-foreground">
                  Create a new product listing
                </p>
              </div>
            </button>
            <button className="flex w-full items-center gap-3 rounded-lg border border-border bg-secondary p-3 text-left transition-colors hover:bg-secondary/80">
              <ShoppingCart className="h-5 w-5 text-foreground" />
              <div>
                <p className="text-sm font-medium text-foreground">
                  Process Orders
                </p>
                <p className="text-xs text-muted-foreground">
                  View and manage pending orders
                </p>
              </div>
            </button>
            <button className="flex w-full items-center gap-3 rounded-lg border border-border bg-secondary p-3 text-left transition-colors hover:bg-secondary/80">
              <AlertCircle className="h-5 w-5 text-foreground" />
              <div>
                <p className="text-sm font-medium text-foreground">
                  Low Stock Alerts
                </p>
                <p className="text-xs text-muted-foreground">
                  {stats.products.lowStock} products need restocking
                </p>
              </div>
            </button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
