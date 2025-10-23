"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Download, TrendingUp, TrendingDown } from "lucide-react"
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"

const salesData = [
  { month: "Jan", revenue: 12400, orders: 145 },
  { month: "Feb", revenue: 15600, orders: 178 },
  { month: "Mar", revenue: 18900, orders: 203 },
  { month: "Apr", revenue: 16200, orders: 189 },
  { month: "May", revenue: 21500, orders: 234 },
  { month: "Jun", revenue: 24800, orders: 267 },
]

const topProducts = [
  { name: "Classic Selvedge Denim Jeans", sales: 234, revenue: 44466.0 },
  { name: "Raw Denim Jacket", sales: 189, revenue: 47247.11 },
  { name: "Vintage Wash Jeans", sales: 156, revenue: 26494.44 },
  { name: "Slim Fit Selvedge", sales: 134, revenue: 26798.66 },
  { name: "Denim Shirt", sales: 98, revenue: 12739.02 },
]

const topCustomers = [
  { name: "Mike Davis", orders: 15, spent: 3567.23 },
  { name: "John Smith", orders: 12, spent: 2456.89 },
  { name: "Sarah Johnson", orders: 8, spent: 1823.45 },
  { name: "Lisa Anderson", orders: 7, spent: 1654.32 },
  { name: "Chris Wilson", orders: 6, spent: 1432.11 },
]

export default function ReportsPage() {
  const [timeRange, setTimeRange] = useState("6months")

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-semibold text-foreground">Reports & Analytics</h1>
          <p className="text-muted-foreground">Track your business performance</p>
        </div>
        <div className="flex gap-2">
          <Select value={timeRange} onValueChange={setTimeRange}>
            <SelectTrigger className="w-40 bg-secondary text-foreground">
              <SelectValue />
            </SelectTrigger>
            <SelectContent className="bg-popover text-popover-foreground">
              <SelectItem value="7days">Last 7 Days</SelectItem>
              <SelectItem value="30days">Last 30 Days</SelectItem>
              <SelectItem value="3months">Last 3 Months</SelectItem>
              <SelectItem value="6months">Last 6 Months</SelectItem>
              <SelectItem value="1year">Last Year</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline" className="border-border text-foreground hover:bg-secondary bg-transparent">
            <Download className="mr-2 h-4 w-4" />
            Export
          </Button>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-4">
        <Card className="border-border bg-card">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Revenue</p>
                <div className="text-2xl font-bold text-card-foreground">$109,400</div>
              </div>
              <TrendingUp className="h-8 w-8 text-green-500" />
            </div>
            <p className="mt-2 text-xs text-green-500">+23.5% from last period</p>
          </CardContent>
        </Card>
        <Card className="border-border bg-card">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Orders</p>
                <div className="text-2xl font-bold text-card-foreground">1,216</div>
              </div>
              <TrendingUp className="h-8 w-8 text-green-500" />
            </div>
            <p className="mt-2 text-xs text-green-500">+18.2% from last period</p>
          </CardContent>
        </Card>
        <Card className="border-border bg-card">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Avg. Order Value</p>
                <div className="text-2xl font-bold text-card-foreground">$89.97</div>
              </div>
              <TrendingDown className="h-8 w-8 text-red-500" />
            </div>
            <p className="mt-2 text-xs text-red-500">-4.3% from last period</p>
          </CardContent>
        </Card>
        <Card className="border-border bg-card">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Conversion Rate</p>
                <div className="text-2xl font-bold text-card-foreground">3.24%</div>
              </div>
              <TrendingUp className="h-8 w-8 text-green-500" />
            </div>
            <p className="mt-2 text-xs text-green-500">+0.8% from last period</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <Card className="border-border bg-card">
          <CardHeader>
            <CardTitle className="text-card-foreground">Revenue Over Time</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={salesData}>
                <CartesianGrid strokeDasharray="3 3" stroke="oklch(0.18 0 0)" />
                <XAxis dataKey="month" stroke="oklch(0.58 0 0)" />
                <YAxis stroke="oklch(0.58 0 0)" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "oklch(0.12 0 0)",
                    border: "1px solid oklch(0.18 0 0)",
                    borderRadius: "8px",
                    color: "oklch(0.98 0 0)",
                  }}
                />
                <Line type="monotone" dataKey="revenue" stroke="oklch(0.65 0.25 280)" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="border-border bg-card">
          <CardHeader>
            <CardTitle className="text-card-foreground">Orders Over Time</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={salesData}>
                <CartesianGrid strokeDasharray="3 3" stroke="oklch(0.18 0 0)" />
                <XAxis dataKey="month" stroke="oklch(0.58 0 0)" />
                <YAxis stroke="oklch(0.58 0 0)" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "oklch(0.12 0 0)",
                    border: "1px solid oklch(0.18 0 0)",
                    borderRadius: "8px",
                    color: "oklch(0.98 0 0)",
                  }}
                />
                <Bar dataKey="orders" fill="oklch(0.6 0.2 200)" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <Card className="border-border bg-card">
          <CardHeader>
            <CardTitle className="text-card-foreground">Top Products</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow className="border-border hover:bg-transparent">
                  <TableHead className="text-muted-foreground">Product</TableHead>
                  <TableHead className="text-muted-foreground">Sales</TableHead>
                  <TableHead className="text-muted-foreground">Revenue</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {topProducts.map((product, index) => (
                  <TableRow key={index} className="border-border hover:bg-secondary/50">
                    <TableCell className="font-medium text-foreground">{product.name}</TableCell>
                    <TableCell className="text-muted-foreground">{product.sales}</TableCell>
                    <TableCell className="text-foreground">${product.revenue.toFixed(2)}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        <Card className="border-border bg-card">
          <CardHeader>
            <CardTitle className="text-card-foreground">Top Customers</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow className="border-border hover:bg-transparent">
                  <TableHead className="text-muted-foreground">Customer</TableHead>
                  <TableHead className="text-muted-foreground">Orders</TableHead>
                  <TableHead className="text-muted-foreground">Total Spent</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {topCustomers.map((customer, index) => (
                  <TableRow key={index} className="border-border hover:bg-secondary/50">
                    <TableCell className="font-medium text-foreground">{customer.name}</TableCell>
                    <TableCell className="text-muted-foreground">{customer.orders}</TableCell>
                    <TableCell className="text-foreground">${customer.spent.toFixed(2)}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
