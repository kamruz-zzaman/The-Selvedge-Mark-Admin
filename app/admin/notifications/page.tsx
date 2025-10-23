"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { MessageSquare, ShoppingCart, Package, AlertCircle } from "lucide-react"

const notifications = [
  {
    id: "1",
    type: "order",
    title: "New order received",
    message: "Order #1005 from David Wilson",
    time: "5 minutes ago",
    read: false,
    icon: ShoppingCart,
  },
  {
    id: "2",
    type: "inventory",
    title: "Low stock alert",
    message: "Vintage Wash Jeans is running low (7 units)",
    time: "1 hour ago",
    read: false,
    icon: AlertCircle,
  },
  {
    id: "3",
    type: "shipping",
    title: "Order shipped",
    message: "Order #1003 has been shipped",
    time: "2 hours ago",
    read: true,
    icon: Package,
  },
  {
    id: "4",
    type: "message",
    title: "New customer message",
    message: "Sarah Johnson sent a message about order #1002",
    time: "3 hours ago",
    read: true,
    icon: MessageSquare,
  },
  {
    id: "5",
    type: "order",
    title: "Order completed",
    message: "Order #1001 has been delivered",
    time: "5 hours ago",
    read: true,
    icon: ShoppingCart,
  },
]

export default function NotificationsPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-semibold text-foreground">Notifications</h1>
          <p className="text-muted-foreground">Manage notification preferences and alerts</p>
        </div>
        <Button variant="outline" className="border-border text-foreground hover:bg-secondary bg-transparent">
          Mark All as Read
        </Button>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2 space-y-4">
          <Card className="border-border bg-card">
            <CardHeader>
              <CardTitle className="text-card-foreground">Recent Notifications</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {notifications.map((notification) => {
                const Icon = notification.icon
                return (
                  <div
                    key={notification.id}
                    className={`flex gap-4 rounded-lg border border-border p-4 ${
                      !notification.read ? "bg-secondary/50" : "bg-transparent"
                    }`}
                  >
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                      <Icon className="h-5 w-5 text-primary" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-start justify-between">
                        <div>
                          <p className="font-medium text-foreground">{notification.title}</p>
                          <p className="text-sm text-muted-foreground">{notification.message}</p>
                        </div>
                        {!notification.read && (
                          <Badge variant="secondary" className="bg-primary/10 text-primary">
                            New
                          </Badge>
                        )}
                      </div>
                      <p className="mt-2 text-xs text-muted-foreground">{notification.time}</p>
                    </div>
                  </div>
                )
              })}
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          <Card className="border-border bg-card">
            <CardHeader>
              <CardTitle className="text-card-foreground">Email Notifications</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label className="text-foreground">New Orders</Label>
                  <p className="text-sm text-muted-foreground">Get notified of new orders</p>
                </div>
                <Switch defaultChecked />
              </div>
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label className="text-foreground">Low Stock</Label>
                  <p className="text-sm text-muted-foreground">Alert when stock is low</p>
                </div>
                <Switch defaultChecked />
              </div>
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label className="text-foreground">Customer Messages</Label>
                  <p className="text-sm text-muted-foreground">New customer inquiries</p>
                </div>
                <Switch defaultChecked />
              </div>
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label className="text-foreground">Order Updates</Label>
                  <p className="text-sm text-muted-foreground">Shipping and delivery updates</p>
                </div>
                <Switch />
              </div>
            </CardContent>
          </Card>

          <Card className="border-border bg-card">
            <CardHeader>
              <CardTitle className="text-card-foreground">Push Notifications</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label className="text-foreground">Desktop Notifications</Label>
                  <p className="text-sm text-muted-foreground">Show browser notifications</p>
                </div>
                <Switch defaultChecked />
              </div>
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label className="text-foreground">Sound Alerts</Label>
                  <p className="text-sm text-muted-foreground">Play sound for notifications</p>
                </div>
                <Switch />
              </div>
              <Button className="w-full bg-primary text-primary-foreground hover:bg-primary/90">
                Save Preferences
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
