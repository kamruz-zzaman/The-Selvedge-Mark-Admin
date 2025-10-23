"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Textarea } from "@/components/ui/textarea"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { ArrowLeft, Mail, Phone, MapPin, Edit, Ban } from "lucide-react"
import Link from "next/link"

export default function CustomerDetailPage({ params }: { params: { id: string } }) {
  const customer = {
    id: params.id,
    name: "John Smith",
    email: "john@example.com",
    phone: "+1 (555) 123-4567",
    dateJoined: "2023-06-15",
    status: "active",
    totalOrders: 12,
    totalSpent: 2456.89,
    averageOrder: 204.74,
    addresses: [
      {
        type: "Shipping",
        address: "123 Main Street",
        city: "New York",
        state: "NY",
        zip: "10001",
        country: "United States",
        default: true,
      },
      {
        type: "Billing",
        address: "123 Main Street",
        city: "New York",
        state: "NY",
        zip: "10001",
        country: "United States",
        default: true,
      },
    ],
    orders: [
      { id: "#3210", date: "2024-01-15", total: 234.0, status: "processing" },
      { id: "#3156", date: "2024-01-08", total: 189.5, status: "delivered" },
      { id: "#3089", date: "2023-12-22", total: 456.0, status: "delivered" },
      { id: "#2987", date: "2023-12-10", total: 123.0, status: "delivered" },
      { id: "#2845", date: "2023-11-28", total: 789.0, status: "delivered" },
    ],
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link href="/admin/customers">
            <Button variant="ghost" size="icon" className="text-foreground hover:bg-secondary">
              <ArrowLeft className="h-5 w-5" />
            </Button>
          </Link>
          <div>
            <h1 className="text-3xl font-semibold text-foreground">{customer.name}</h1>
            <p className="text-muted-foreground">Customer since {customer.dateJoined}</p>
          </div>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" className="border-border text-foreground hover:bg-secondary bg-transparent">
            <Edit className="mr-2 h-4 w-4" />
            Edit
          </Button>
          <Button
            variant="outline"
            className="border-destructive text-destructive hover:bg-destructive/10 bg-transparent"
          >
            <Ban className="mr-2 h-4 w-4" />
            Block
          </Button>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2 space-y-6">
          <div className="grid gap-4 md:grid-cols-3">
            <Card className="border-border bg-card">
              <CardContent className="pt-6">
                <div className="text-2xl font-bold text-card-foreground">{customer.totalOrders}</div>
                <p className="text-sm text-muted-foreground">Total Orders</p>
              </CardContent>
            </Card>
            <Card className="border-border bg-card">
              <CardContent className="pt-6">
                <div className="text-2xl font-bold text-card-foreground">${customer.totalSpent.toFixed(2)}</div>
                <p className="text-sm text-muted-foreground">Total Spent</p>
              </CardContent>
            </Card>
            <Card className="border-border bg-card">
              <CardContent className="pt-6">
                <div className="text-2xl font-bold text-card-foreground">${customer.averageOrder.toFixed(2)}</div>
                <p className="text-sm text-muted-foreground">Avg. Order Value</p>
              </CardContent>
            </Card>
          </div>

          <Card className="border-border bg-card">
            <CardHeader>
              <CardTitle className="text-card-foreground">Order History</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow className="border-border hover:bg-transparent">
                    <TableHead className="text-muted-foreground">Order ID</TableHead>
                    <TableHead className="text-muted-foreground">Date</TableHead>
                    <TableHead className="text-muted-foreground">Total</TableHead>
                    <TableHead className="text-muted-foreground">Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {customer.orders.map((order) => (
                    <TableRow key={order.id} className="border-border hover:bg-secondary/50">
                      <TableCell>
                        <Link
                          href={`/admin/orders/${order.id.slice(1)}`}
                          className="font-medium text-foreground hover:text-accent"
                        >
                          {order.id}
                        </Link>
                      </TableCell>
                      <TableCell className="text-muted-foreground">{order.date}</TableCell>
                      <TableCell className="text-foreground">${order.total.toFixed(2)}</TableCell>
                      <TableCell>
                        <Badge
                          variant="secondary"
                          className={
                            order.status === "delivered"
                              ? "bg-green-500/10 text-green-500"
                              : "bg-blue-500/10 text-blue-500"
                          }
                        >
                          {order.status}
                        </Badge>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>

          <Card className="border-border bg-card">
            <CardHeader>
              <CardTitle className="text-card-foreground">Addresses</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {customer.addresses.map((address, index) => (
                <div key={index} className="rounded-lg border border-border bg-secondary p-4">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-medium text-foreground">{address.type}</h3>
                    {address.default && (
                      <Badge variant="secondary" className="bg-accent/10 text-accent">
                        Default
                      </Badge>
                    )}
                  </div>
                  <p className="text-sm text-foreground">{address.address}</p>
                  <p className="text-sm text-foreground">
                    {address.city}, {address.state} {address.zip}
                  </p>
                  <p className="text-sm text-foreground">{address.country}</p>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card className="border-border bg-card">
            <CardHeader>
              <CardTitle className="text-card-foreground">Internal Notes</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <Textarea
                placeholder="Add notes about this customer..."
                rows={4}
                className="bg-secondary text-foreground placeholder:text-muted-foreground"
              />
              <Button className="bg-primary text-primary-foreground hover:bg-primary/90">Add Note</Button>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          <Card className="border-border bg-card">
            <CardHeader>
              <CardTitle className="text-card-foreground">Contact Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-3">
                <Mail className="h-4 w-4 text-muted-foreground" />
                <div>
                  <p className="text-sm font-medium text-foreground">Email</p>
                  <p className="text-sm text-muted-foreground">{customer.email}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="h-4 w-4 text-muted-foreground" />
                <div>
                  <p className="text-sm font-medium text-foreground">Phone</p>
                  <p className="text-sm text-muted-foreground">{customer.phone}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <MapPin className="h-4 w-4 text-muted-foreground" />
                <div>
                  <p className="text-sm font-medium text-foreground">Location</p>
                  <p className="text-sm text-muted-foreground">New York, NY</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-border bg-card">
            <CardHeader>
              <CardTitle className="text-card-foreground">Account Status</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Status</span>
                <Badge variant="secondary" className="bg-green-500/10 text-green-500">
                  {customer.status}
                </Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Member Since</span>
                <span className="text-sm text-foreground">{customer.dateJoined}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Last Order</span>
                <span className="text-sm text-foreground">2024-01-15</span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
