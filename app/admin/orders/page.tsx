"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Search, Filter, Download } from "lucide-react";
import Link from "next/link";
import { ordersApi } from "@/lib/api/orders";

const statusColors = {
  pending: "bg-yellow-500/10 text-yellow-500 hover:bg-yellow-500/20",
  processing: "bg-blue-500/10 text-blue-500 hover:bg-blue-500/20",
  shipped: "bg-purple-500/10 text-purple-500 hover:bg-purple-500/20",
  delivered: "bg-green-500/10 text-green-500 hover:bg-green-500/20",
  cancelled: "bg-red-500/10 text-red-500 hover:bg-red-500/20",
};

export default function OrdersPage() {
  const [orders, setOrders] = useState<any[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const response = await ordersApi.getAll();
      setOrders(response.data);
    } catch (error) {
      console.error("Failed to fetch orders:", error);
    } finally {
      setLoading(false);
    }
  };

  const formatOrderId = (id: string) => `#${id.slice(-4).toUpperCase()}`;

  const filteredOrders = orders.filter((order) => {
    const matchesSearch =
      order.user?.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.user?.email?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      formatOrderId(order._id)
        .toLowerCase()
        .includes(searchQuery.toLowerCase());
    const matchesStatus =
      statusFilter === "all" || order.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <p className="text-muted-foreground">Loading orders...</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-semibold text-foreground">Orders</h1>
          <p className="text-muted-foreground">
            Manage and track customer orders
          </p>
        </div>
        <Button
          variant="outline"
          className="border-border text-foreground hover:bg-secondary bg-transparent"
        >
          <Download className="mr-2 h-4 w-4" />
          Export
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-4">
        <Card className="border-border bg-card">
          <CardContent className="pt-6">
            <div className="text-2xl font-bold text-card-foreground">234</div>
            <p className="text-sm text-muted-foreground">Total Orders</p>
          </CardContent>
        </Card>
        <Card className="border-border bg-card">
          <CardContent className="pt-6">
            <div className="text-2xl font-bold text-card-foreground">18</div>
            <p className="text-sm text-muted-foreground">Pending</p>
          </CardContent>
        </Card>
        <Card className="border-border bg-card">
          <CardContent className="pt-6">
            <div className="text-2xl font-bold text-card-foreground">12</div>
            <p className="text-sm text-muted-foreground">Processing</p>
          </CardContent>
        </Card>
        <Card className="border-border bg-card">
          <CardContent className="pt-6">
            <div className="text-2xl font-bold text-card-foreground">8</div>
            <p className="text-sm text-muted-foreground">Shipped</p>
          </CardContent>
        </Card>
      </div>

      <Card className="border-border bg-card">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-card-foreground">All Orders</CardTitle>
            <div className="flex items-center gap-2">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  placeholder="Search orders..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-64 pl-10 bg-secondary text-foreground placeholder:text-muted-foreground"
                />
              </div>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-40 bg-secondary text-foreground">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-popover text-popover-foreground">
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="processing">Processing</SelectItem>
                  <SelectItem value="shipped">Shipped</SelectItem>
                  <SelectItem value="delivered">Delivered</SelectItem>
                  <SelectItem value="cancelled">Cancelled</SelectItem>
                </SelectContent>
              </Select>
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
                <TableHead className="text-muted-foreground">
                  Order ID
                </TableHead>
                <TableHead className="text-muted-foreground">
                  Customer
                </TableHead>
                <TableHead className="text-muted-foreground">Date</TableHead>
                <TableHead className="text-muted-foreground">Items</TableHead>
                <TableHead className="text-muted-foreground">Total</TableHead>
                <TableHead className="text-muted-foreground">Payment</TableHead>
                <TableHead className="text-muted-foreground">Status</TableHead>
                <TableHead className="text-muted-foreground"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredOrders.map((order) => (
                <TableRow
                  key={order._id}
                  className="border-border hover:bg-secondary/50"
                >
                  <TableCell>
                    <Link
                      href={`/admin/orders/${order._id}`}
                      className="font-medium text-foreground hover:text-accent"
                    >
                      {formatOrderId(order._id)}
                    </Link>
                  </TableCell>
                  <TableCell>
                    <div>
                      <p className="font-medium text-foreground">
                        {order.user?.name || "N/A"}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {order.user?.email || "N/A"}
                      </p>
                    </div>
                  </TableCell>
                  <TableCell className="text-muted-foreground">
                    {new Date(order.createdAt).toLocaleDateString()}
                  </TableCell>
                  <TableCell className="text-muted-foreground">
                    {order.products?.length || 0}
                  </TableCell>
                  <TableCell className="font-medium text-foreground">
                    ${order.totalPrice.toFixed(2)}
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant="secondary"
                      className={
                        order.payment === "paid"
                          ? "bg-green-500/10 text-green-500"
                          : order.payment === "pending"
                          ? "bg-yellow-500/10 text-yellow-500"
                          : "bg-destructive/10 text-destructive"
                      }
                    >
                      {order.payment}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant="secondary"
                      className={
                        statusColors[order.status as keyof typeof statusColors]
                      }
                    >
                      {order.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Link href={`/admin/orders/${order._id}`}>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="text-muted-foreground hover:text-foreground"
                      >
                        View Details
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
  );
}
