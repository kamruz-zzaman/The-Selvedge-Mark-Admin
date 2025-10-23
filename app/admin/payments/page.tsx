"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { CreditCard, DollarSign, TrendingUp, AlertCircle } from "lucide-react"

const transactions = [
  {
    id: "1",
    orderId: "#1001",
    customer: "John Smith",
    amount: 494.58,
    method: "Credit Card",
    status: "completed",
    date: "2024-01-15",
  },
  {
    id: "2",
    orderId: "#1002",
    customer: "Sarah Johnson",
    amount: 189.99,
    method: "PayPal",
    status: "completed",
    date: "2024-01-15",
  },
  {
    id: "3",
    orderId: "#1003",
    customer: "Mike Davis",
    amount: 329.99,
    method: "Credit Card",
    status: "pending",
    date: "2024-01-16",
  },
  {
    id: "4",
    orderId: "#1004",
    customer: "Emily Brown",
    amount: 249.99,
    method: "Apple Pay",
    status: "completed",
    date: "2024-01-16",
  },
  {
    id: "5",
    orderId: "#1005",
    customer: "David Wilson",
    amount: 159.99,
    method: "Credit Card",
    status: "failed",
    date: "2024-01-16",
  },
]

export default function PaymentsPage() {
  const stats = {
    totalRevenue: 12458.5,
    pendingPayments: 329.99,
    completedToday: 8,
    failedPayments: 2,
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-semibold text-foreground">Payments</h1>
          <p className="text-muted-foreground">Manage payment methods and transactions</p>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-4">
        <Card className="border-border bg-card">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Total Revenue</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">${stats.totalRevenue.toLocaleString()}</div>
            <p className="text-xs text-green-500 mt-1">+12.5% from last month</p>
          </CardContent>
        </Card>

        <Card className="border-border bg-card">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Pending</CardTitle>
            <TrendingUp className="h-4 w-4 text-yellow-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-yellow-500">${stats.pendingPayments}</div>
          </CardContent>
        </Card>

        <Card className="border-border bg-card">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Completed Today</CardTitle>
            <CreditCard className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">{stats.completedToday}</div>
          </CardContent>
        </Card>

        <Card className="border-border bg-card">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Failed</CardTitle>
            <AlertCircle className="h-4 w-4 text-destructive" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-destructive">{stats.failedPayments}</div>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <Card className="border-border bg-card">
          <CardHeader>
            <CardTitle className="text-card-foreground">Payment Methods</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label className="text-foreground">Credit Cards</Label>
                <p className="text-sm text-muted-foreground">Visa, Mastercard, Amex</p>
              </div>
              <Switch defaultChecked />
            </div>
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label className="text-foreground">PayPal</Label>
                <p className="text-sm text-muted-foreground">PayPal checkout</p>
              </div>
              <Switch defaultChecked />
            </div>
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label className="text-foreground">Apple Pay</Label>
                <p className="text-sm text-muted-foreground">Apple Pay express checkout</p>
              </div>
              <Switch defaultChecked />
            </div>
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label className="text-foreground">Google Pay</Label>
                <p className="text-sm text-muted-foreground">Google Pay express checkout</p>
              </div>
              <Switch />
            </div>
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label className="text-foreground">Bank Transfer</Label>
                <p className="text-sm text-muted-foreground">Direct bank transfer</p>
              </div>
              <Switch />
            </div>
          </CardContent>
        </Card>

        <Card className="border-border bg-card">
          <CardHeader>
            <CardTitle className="text-card-foreground">Payment Settings</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label className="text-foreground">Test Mode</Label>
                <p className="text-sm text-muted-foreground">Use test payment gateway</p>
              </div>
              <Switch />
            </div>
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label className="text-foreground">Auto Capture</Label>
                <p className="text-sm text-muted-foreground">Automatically capture payments</p>
              </div>
              <Switch defaultChecked />
            </div>
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label className="text-foreground">Email Receipts</Label>
                <p className="text-sm text-muted-foreground">Send payment receipts to customers</p>
              </div>
              <Switch defaultChecked />
            </div>
            <Button className="w-full bg-primary text-primary-foreground hover:bg-primary/90">Save Settings</Button>
          </CardContent>
        </Card>
      </div>

      <Card className="border-border bg-card">
        <CardHeader>
          <CardTitle className="text-card-foreground">Recent Transactions</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow className="border-border hover:bg-transparent">
                <TableHead className="text-muted-foreground">Order</TableHead>
                <TableHead className="text-muted-foreground">Customer</TableHead>
                <TableHead className="text-muted-foreground">Amount</TableHead>
                <TableHead className="text-muted-foreground">Method</TableHead>
                <TableHead className="text-muted-foreground">Status</TableHead>
                <TableHead className="text-muted-foreground">Date</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {transactions.map((transaction) => (
                <TableRow key={transaction.id} className="border-border hover:bg-secondary/50">
                  <TableCell className="font-mono font-medium text-foreground">{transaction.orderId}</TableCell>
                  <TableCell className="text-foreground">{transaction.customer}</TableCell>
                  <TableCell className="text-foreground">${transaction.amount.toFixed(2)}</TableCell>
                  <TableCell className="text-muted-foreground">{transaction.method}</TableCell>
                  <TableCell>
                    <Badge
                      variant="secondary"
                      className={
                        transaction.status === "completed"
                          ? "bg-green-500/10 text-green-500"
                          : transaction.status === "pending"
                            ? "bg-yellow-500/10 text-yellow-500"
                            : "bg-destructive/10 text-destructive"
                      }
                    >
                      {transaction.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-muted-foreground">{transaction.date}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}
