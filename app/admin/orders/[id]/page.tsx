"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ArrowLeft, Printer, Mail, Package, MapPin, CreditCard, User } from "lucide-react"
import Link from "next/link"

export default function OrderDetailPage({ params }: { params: { id: string } }) {
  const order = {
    id: `#${params.id}`,
    customer: {
      name: "John Smith",
      email: "john@example.com",
      phone: "+1 (555) 123-4567",
    },
    shipping: {
      address: "123 Main Street",
      city: "New York",
      state: "NY",
      zip: "10001",
      country: "United States",
    },
    billing: {
      address: "123 Main Street",
      city: "New York",
      state: "NY",
      zip: "10001",
      country: "United States",
    },
    items: [
      {
        id: "1",
        name: "Classic Selvedge Denim Jeans",
        variant: "Size: 32, Color: Indigo",
        quantity: 1,
        price: 189.99,
        image: "/denim-jeans.png",
      },
      {
        id: "2",
        name: "Raw Denim Jacket",
        variant: "Size: M, Color: Raw Blue",
        quantity: 1,
        price: 249.99,
        image: "/classic-denim-jacket.png",
      },
    ],
    subtotal: 439.98,
    discount: 20.0,
    shipping: 15.0,
    tax: 39.6,
    total: 474.58,
    status: "processing",
    payment: {
      method: "Credit Card",
      reference: "ch_3NqK8TLkdIwHu7ix0B3YqZzD",
      status: "paid",
    },
    tracking: "1Z999AA10123456784",
    date: "2024-01-15",
    timeline: [
      { status: "Order placed", date: "2024-01-15 10:30 AM", completed: true },
      { status: "Payment confirmed", date: "2024-01-15 10:31 AM", completed: true },
      { status: "Processing", date: "2024-01-15 11:00 AM", completed: true },
      { status: "Shipped", date: "Pending", completed: false },
      { status: "Delivered", date: "Pending", completed: false },
    ],
  }

  const companyInfo = {
    name: "Selvedge Mark",
    address: "456 Fashion Avenue",
    city: "New York, NY 10018",
    country: "United States",
    phone: "+1 (555) 987-6543",
    email: "orders@selvedgemark.com",
    taxId: "TAX-123456789",
  }

  const handlePrint = () => {
    window.print()
  }

  return (
    <div className="space-y-6">
      <div className="hidden print:block print-invoice">
        {/* Header Section */}
        <div className="flex items-start justify-between mb-8 pb-6 border-b-2 border-gray-300">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">{companyInfo.name}</h1>
            <p className="text-sm text-gray-600">{companyInfo.address}</p>
            <p className="text-sm text-gray-600">{companyInfo.city}</p>
            <p className="text-sm text-gray-600">{companyInfo.country}</p>
            <p className="text-sm text-gray-600 mt-2">Phone: {companyInfo.phone}</p>
            <p className="text-sm text-gray-600">Email: {companyInfo.email}</p>
          </div>
          <div className="text-right">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">INVOICE</h2>
            <p className="text-sm text-gray-600">
              <span className="font-semibold">Invoice No:</span> {order.id}
            </p>
            <p className="text-sm text-gray-600">
              <span className="font-semibold">Date:</span> {order.date}
            </p>
            <p className="text-sm text-gray-600 mt-2">
              <span className="font-semibold">Tax ID:</span> {companyInfo.taxId}
            </p>
          </div>
        </div>

        {/* Seller & Buyer Info */}
        <div className="grid grid-cols-2 gap-8 mb-8">
          <div>
            <h3 className="text-sm font-bold text-gray-900 mb-3 uppercase">From (Seller)</h3>
            <div className="bg-gray-50 p-4 rounded">
              <p className="font-semibold text-gray-900">{companyInfo.name}</p>
              <p className="text-sm text-gray-600 mt-1">{companyInfo.address}</p>
              <p className="text-sm text-gray-600">{companyInfo.city}</p>
              <p className="text-sm text-gray-600">{companyInfo.country}</p>
              <p className="text-sm text-gray-600 mt-2">Phone: {companyInfo.phone}</p>
              <p className="text-sm text-gray-600">Email: {companyInfo.email}</p>
              <p className="text-sm text-gray-600">Tax ID: {companyInfo.taxId}</p>
            </div>
          </div>
          <div>
            <h3 className="text-sm font-bold text-gray-900 mb-3 uppercase">To (Buyer)</h3>
            <div className="bg-gray-50 p-4 rounded">
              <p className="font-semibold text-gray-900">{order.customer.name}</p>
              <p className="text-sm text-gray-600 mt-1">{order.shipping.address}</p>
              <p className="text-sm text-gray-600">
                {order.shipping.city}, {order.shipping.state} {order.shipping.zip}
              </p>
              <p className="text-sm text-gray-600">{order.shipping.country}</p>
              <p className="text-sm text-gray-600 mt-2">Phone: {order.customer.phone}</p>
              <p className="text-sm text-gray-600">Email: {order.customer.email}</p>
            </div>
          </div>
        </div>

        {/* Order Details Table */}
        <div className="mb-8">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-gray-900 text-white">
                <th className="text-left py-3 px-4 text-sm font-semibold">SL</th>
                <th className="text-left py-3 px-4 text-sm font-semibold">Item Name / Description</th>
                <th className="text-center py-3 px-4 text-sm font-semibold">Qty</th>
                <th className="text-right py-3 px-4 text-sm font-semibold">Unit Price</th>
                <th className="text-right py-3 px-4 text-sm font-semibold">Total</th>
              </tr>
            </thead>
            <tbody>
              {order.items.map((item, index) => (
                <tr key={item.id} className={index % 2 === 0 ? "bg-white" : "bg-gray-50"}>
                  <td className="py-3 px-4 text-sm text-gray-900 border-b border-gray-200">{index + 1}</td>
                  <td className="py-3 px-4 border-b border-gray-200">
                    <p className="text-sm font-medium text-gray-900">{item.name}</p>
                    <p className="text-xs text-gray-600">{item.variant}</p>
                  </td>
                  <td className="text-center py-3 px-4 text-sm text-gray-900 border-b border-gray-200">
                    {item.quantity}
                  </td>
                  <td className="text-right py-3 px-4 text-sm text-gray-900 border-b border-gray-200">
                    ${item.price.toFixed(2)}
                  </td>
                  <td className="text-right py-3 px-4 text-sm font-medium text-gray-900 border-b border-gray-200">
                    ${(item.price * item.quantity).toFixed(2)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Summary Section */}
        <div className="flex justify-end mb-8">
          <div className="w-80">
            <div className="space-y-2 mb-4">
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Subtotal:</span>
                <span className="text-gray-900">${order.subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Tax / VAT:</span>
                <span className="text-gray-900">${order.tax.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Discount:</span>
                <span className="text-red-600">-${order.discount.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Shipping Fee:</span>
                <span className="text-gray-900">${order.shipping.toFixed(2)}</span>
              </div>
            </div>
            <div className="flex justify-between pt-4 border-t-2 border-gray-900">
              <span className="text-lg font-bold text-gray-900">Grand Total:</span>
              <span className="text-lg font-bold text-gray-900">${order.total.toFixed(2)}</span>
            </div>
          </div>
        </div>

        {/* Payment Details */}
        <div className="mb-8 bg-gray-50 p-4 rounded">
          <h3 className="text-sm font-bold text-gray-900 mb-3 uppercase">Payment Details</h3>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-gray-600">Payment Method:</p>
              <p className="text-sm font-semibold text-gray-900">{order.payment.method}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Transaction ID:</p>
              <p className="text-sm font-mono text-gray-900">{order.payment.reference}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Payment Status:</p>
              <p className="text-sm font-semibold text-green-600 uppercase">{order.payment.status}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Tracking Number:</p>
              <p className="text-sm font-mono text-gray-900">{order.tracking}</p>
            </div>
          </div>
        </div>

        {/* Footer Section */}
        <div className="border-t-2 border-gray-300 pt-6">
          <div className="grid grid-cols-2 gap-8 mb-6">
            <div>
              <h3 className="text-sm font-bold text-gray-900 mb-2">Terms & Conditions</h3>
              <p className="text-xs text-gray-600">1. Goods once sold cannot be returned or exchanged.</p>
              <p className="text-xs text-gray-600">2. Payment must be made within 30 days of invoice date.</p>
              <p className="text-xs text-gray-600">3. All disputes subject to New York jurisdiction.</p>
            </div>
            <div>
              <h3 className="text-sm font-bold text-gray-900 mb-2">Customer Support</h3>
              <p className="text-xs text-gray-600">Hotline: {companyInfo.phone}</p>
              <p className="text-xs text-gray-600">Email: {companyInfo.email}</p>
              <p className="text-xs text-gray-600">Website: www.selvedgemark.com</p>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-8 mt-12">
            <div className="text-center">
              <div className="border-t border-gray-400 pt-2">
                <p className="text-xs text-gray-600">Authorized Signature</p>
              </div>
            </div>
            <div className="text-center">
              <div className="border-t border-gray-400 pt-2">
                <p className="text-xs text-gray-600">Customer Signature</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Screen View */}
      <div className="print:hidden">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link href="/admin/orders">
              <Button variant="ghost" size="icon" className="text-foreground hover:bg-secondary">
                <ArrowLeft className="h-5 w-5" />
              </Button>
            </Link>
            <div>
              <h1 className="text-3xl font-semibold text-foreground">Order {order.id}</h1>
              <p className="text-muted-foreground">Placed on {order.date}</p>
            </div>
          </div>
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="icon"
              onClick={handlePrint}
              className="border-border text-foreground hover:bg-secondary bg-transparent"
            >
              <Printer className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              className="border-border text-foreground hover:bg-secondary bg-transparent"
            >
              <Mail className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          <div className="lg:col-span-2 space-y-6">
            <Card className="border-border bg-card">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-card-foreground">Order Items</CardTitle>
                  <Badge variant="secondary" className="bg-blue-500/10 text-blue-500">
                    {order.status}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {order.items.map((item) => (
                    <div key={item.id} className="flex gap-4 border-b border-border pb-4 last:border-0 last:pb-0">
                      <img
                        src={item.image || "/placeholder.svg"}
                        alt={item.name}
                        className="h-20 w-20 rounded border border-border object-cover"
                      />
                      <div className="flex-1">
                        <h3 className="font-medium text-foreground">{item.name}</h3>
                        <p className="text-sm text-muted-foreground">{item.variant}</p>
                        <p className="text-sm text-muted-foreground">Quantity: {item.quantity}</p>
                      </div>
                      <div className="text-right">
                        <p className="font-medium text-foreground">${item.price.toFixed(2)}</p>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="mt-6 space-y-2 border-t border-border pt-4">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Subtotal</span>
                    <span className="text-foreground">${order.subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Shipping</span>
                    <span className="text-foreground">${order.shipping.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Discount</span>
                    <span className="text-foreground">-${order.discount.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Tax</span>
                    <span className="text-foreground">${order.tax.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between border-t border-border pt-2 font-semibold">
                    <span className="text-foreground">Total</span>
                    <span className="text-foreground">${order.total.toFixed(2)}</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-border bg-card">
              <CardHeader>
                <CardTitle className="text-card-foreground">Order Timeline</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-4">
                  {order.timeline.map((event, index) => (
                    <div key={index} className="flex gap-4">
                      <div className="flex flex-col items-center">
                        <div
                          className={`flex h-8 w-8 items-center justify-center rounded-full ${
                            event.completed ? "bg-green-500/20 text-green-500" : "bg-secondary text-muted-foreground"
                          }`}
                        >
                          {event.completed ? "✓" : index + 1}
                        </div>
                        {index < order.timeline.length - 1 && (
                          <div className={`h-12 w-0.5 ${event.completed ? "bg-green-500/20" : "bg-border"}`} />
                        )}
                      </div>
                      <div className="flex-1 pb-4">
                        <p className="font-medium text-foreground">{event.status}</p>
                        <p className="text-sm text-muted-foreground">{event.date}</p>
                      </div>
                    </div>
                  ))}
                  {order.status === "cancelled" && (
                    <div className="flex gap-4">
                      <div className="flex flex-col items-center">
                        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-destructive/20 text-destructive">
                          ✕
                        </div>
                      </div>
                      <div className="flex-1">
                        <p className="font-medium text-destructive">Order Cancelled</p>
                        <p className="text-sm text-muted-foreground">Cancelled by customer</p>
                      </div>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

            <Card className="border-border bg-card">
              <CardHeader>
                <CardTitle className="text-card-foreground">Internal Notes</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <Textarea
                  placeholder="Add notes about this order..."
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
                <CardTitle className="text-card-foreground">Order Status</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground">Update Status</label>
                  <Select defaultValue={order.status}>
                    <SelectTrigger className="bg-secondary text-foreground">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-popover text-popover-foreground">
                      <SelectItem value="pending">Pending</SelectItem>
                      <SelectItem value="processing">Processing</SelectItem>
                      <SelectItem value="shipped">Shipped</SelectItem>
                      <SelectItem value="delivered">Delivered</SelectItem>
                      <SelectItem value="cancelled">Cancelled</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <Button className="w-full bg-primary text-primary-foreground hover:bg-primary/90">Update Status</Button>
              </CardContent>
            </Card>

            <Card className="border-border bg-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-card-foreground">
                  <User className="h-4 w-4" />
                  Customer
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <p className="font-medium text-foreground">{order.customer.name}</p>
                <p className="text-sm text-muted-foreground">{order.customer.email}</p>
                <p className="text-sm text-muted-foreground">{order.customer.phone}</p>
              </CardContent>
            </Card>

            <Card className="border-border bg-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-card-foreground">
                  <MapPin className="h-4 w-4" />
                  Shipping Address
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-1">
                <p className="text-sm text-foreground">{order.shipping.address}</p>
                <p className="text-sm text-foreground">
                  {order.shipping.city}, {order.shipping.state} {order.shipping.zip}
                </p>
                <p className="text-sm text-foreground">{order.shipping.country}</p>
              </CardContent>
            </Card>

            <Card className="border-border bg-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-card-foreground">
                  <CreditCard className="h-4 w-4" />
                  Payment
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Method</span>
                  <span className="text-foreground">{order.payment.method}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Status</span>
                  <Badge variant="secondary" className="bg-green-500/10 text-green-500">
                    {order.payment.status}
                  </Badge>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Reference</span>
                  <span className="font-mono text-xs text-foreground">{order.payment.reference}</span>
                </div>
              </CardContent>
            </Card>

            <Card className="border-border bg-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-card-foreground">
                  <Package className="h-4 w-4" />
                  Shipping
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Tracking</span>
                  <span className="font-mono text-xs text-foreground">{order.tracking}</span>
                </div>
                <Button
                  variant="outline"
                  className="w-full border-border text-foreground hover:bg-secondary bg-transparent"
                >
                  Track Package
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
