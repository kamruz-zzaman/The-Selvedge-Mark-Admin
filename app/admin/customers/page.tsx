"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Search, Filter, UserPlus } from "lucide-react"
import Link from "next/link"

const customers = [
  {
    id: "1",
    name: "John Smith",
    email: "john@example.com",
    phone: "+1 (555) 123-4567",
    orders: 12,
    totalSpent: 2456.89,
    dateJoined: "2023-06-15",
    status: "active",
  },
  {
    id: "2",
    name: "Sarah Johnson",
    email: "sarah@example.com",
    phone: "+1 (555) 234-5678",
    orders: 8,
    totalSpent: 1823.45,
    dateJoined: "2023-08-22",
    status: "active",
  },
  {
    id: "3",
    name: "Mike Davis",
    email: "mike@example.com",
    phone: "+1 (555) 345-6789",
    orders: 15,
    totalSpent: 3567.23,
    dateJoined: "2023-03-10",
    status: "active",
  },
  {
    id: "4",
    name: "Emily Brown",
    email: "emily@example.com",
    phone: "+1 (555) 456-7890",
    orders: 3,
    totalSpent: 567.9,
    dateJoined: "2023-11-05",
    status: "active",
  },
  {
    id: "5",
    name: "Chris Wilson",
    email: "chris@example.com",
    phone: "+1 (555) 567-8901",
    orders: 0,
    totalSpent: 0,
    dateJoined: "2024-01-12",
    status: "blocked",
  },
]

export default function CustomersPage() {
  const [searchQuery, setSearchQuery] = useState("")

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-semibold text-foreground">Customers</h1>
          <p className="text-muted-foreground">Manage your customer base</p>
        </div>
        <Button className="bg-primary text-primary-foreground hover:bg-primary/90">
          <UserPlus className="mr-2 h-4 w-4" />
          Add Customer
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-4">
        <Card className="border-border bg-card">
          <CardContent className="pt-6">
            <div className="text-2xl font-bold text-card-foreground">1,429</div>
            <p className="text-sm text-muted-foreground">Total Customers</p>
          </CardContent>
        </Card>
        <Card className="border-border bg-card">
          <CardContent className="pt-6">
            <div className="text-2xl font-bold text-card-foreground">48</div>
            <p className="text-sm text-muted-foreground">New This Week</p>
          </CardContent>
        </Card>
        <Card className="border-border bg-card">
          <CardContent className="pt-6">
            <div className="text-2xl font-bold text-card-foreground">$1,234</div>
            <p className="text-sm text-muted-foreground">Avg. Lifetime Value</p>
          </CardContent>
        </Card>
        <Card className="border-border bg-card">
          <CardContent className="pt-6">
            <div className="text-2xl font-bold text-card-foreground">67%</div>
            <p className="text-sm text-muted-foreground">Repeat Rate</p>
          </CardContent>
        </Card>
      </div>

      <Card className="border-border bg-card">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-card-foreground">All Customers</CardTitle>
            <div className="flex items-center gap-2">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  placeholder="Search customers..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-64 pl-10 bg-secondary text-foreground placeholder:text-muted-foreground"
                />
              </div>
              <Button
                variant="outline"
                size="icon"
                className="border-border text-foreground hover:bg-secondary bg-transparent"
              >
                <Filter className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow className="border-border hover:bg-transparent">
                <TableHead className="text-muted-foreground">Customer</TableHead>
                <TableHead className="text-muted-foreground">Contact</TableHead>
                <TableHead className="text-muted-foreground">Orders</TableHead>
                <TableHead className="text-muted-foreground">Total Spent</TableHead>
                <TableHead className="text-muted-foreground">Date Joined</TableHead>
                <TableHead className="text-muted-foreground">Status</TableHead>
                <TableHead className="text-muted-foreground"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {customers.map((customer) => (
                <TableRow key={customer.id} className="border-border hover:bg-secondary/50">
                  <TableCell>
                    <Link
                      href={`/admin/customers/${customer.id}`}
                      className="font-medium text-foreground hover:text-accent"
                    >
                      {customer.name}
                    </Link>
                  </TableCell>
                  <TableCell>
                    <div>
                      <p className="text-sm text-foreground">{customer.email}</p>
                      <p className="text-xs text-muted-foreground">{customer.phone}</p>
                    </div>
                  </TableCell>
                  <TableCell className="text-foreground">{customer.orders}</TableCell>
                  <TableCell className="text-foreground">${customer.totalSpent.toFixed(2)}</TableCell>
                  <TableCell className="text-muted-foreground">{customer.dateJoined}</TableCell>
                  <TableCell>
                    <Badge
                      variant="secondary"
                      className={
                        customer.status === "active" ? "bg-green-500/10 text-green-500" : "bg-red-500/10 text-red-500"
                      }
                    >
                      {customer.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Link href={`/admin/customers/${customer.id}`}>
                      <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-foreground">
                        View
                      </Button>
                    </Link>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}
