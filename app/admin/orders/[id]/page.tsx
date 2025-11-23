"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Skeleton } from "@/components/ui/skeleton";
import { ArrowLeft, Package, User, MapPin, CreditCard } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ordersApi } from "@/lib/api/orders";
import { useToast } from "@/hooks/use-toast";

const statusColors: Record<string, string> = {
  pending: "bg-yellow-500/10 text-yellow-500 hover:bg-yellow-500/20",
  processing: "bg-blue-500/10 text-blue-500 hover:bg-blue-500/20",
  shipped: "bg-purple-500/10 text-purple-500 hover:bg-purple-500/20",
  delivered: "bg-green-500/10 text-green-500 hover:bg-green-500/20",
  cancelled: "bg-red-500/10 text-red-500 hover:bg-red-500/20",
};

export default function OrderDetailsPage({
  params,
}: {
  params: { id: string };
}) {
  const router = useRouter();
  const { toast } = useToast();
  const [order, setOrder] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);

  useEffect(() => {
    fetchOrder();
  }, [params.id]);

  const fetchOrder = async () => {
    try {
      const response = await ordersApi.getById(params.id);
      setOrder(response.data);
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.response?.data?.error || "Failed to fetch order",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleStatusChange = async (newStatus: string) => {
    setUpdating(true);
    try {
      await ordersApi.updateStatus(params.id, newStatus);
      setOrder({ ...order, status: newStatus });
      toast({
        title: "Success",
        description: "Order status updated successfully",
      });
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.response?.data?.error || "Failed to update status",
        variant: "destructive",
      });
    } finally {
      setUpdating(false);
    }
  };

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="flex items-center gap-4">
          <Skeleton className="h-10 w-10" />
          <div>
            <Skeleton className="h-9 w-48" />
            <Skeleton className="h-5 w-32 mt-2" />
          </div>
        </div>
        <div className="grid gap-6 lg:grid-cols-3">
          <div className="lg:col-span-2 space-y-6">
            <Skeleton className="h-64 w-full" />
            <Skeleton className="h-48 w-full" />
          </div>
          <Skeleton className="h-96 w-full" />
        </div>
      </div>
    );
  }

  if (!order) {
    return (
      <div className="flex items-center justify-center h-64">
        <p className="text-muted-foreground">Order not found</p>
      </div>
    );
  }

  const subtotal =
    order.products?.reduce(
      (sum: number, item: any) => sum + item.price * item.quantity,
      0
    ) || 0;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link href="/admin/orders">
            <Button
              variant="ghost"
              size="icon"
              className="text-foreground hover:bg-secondary"
            >
              <ArrowLeft className="h-5 w-5" />
            </Button>
          </Link>
          <div>
            <h1 className="text-3xl font-bold text-foreground">
              Order #{order._id?.slice(-8)}
            </h1>
            <p className="text-muted-foreground">
              {new Date(order.createdAt).toLocaleDateString()} at{" "}
              {new Date(order.createdAt).toLocaleTimeString()}
            </p>
          </div>
        </div>
        <Badge variant="secondary" className={statusColors[order.status]}>
          {order.status}
        </Badge>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2 space-y-6">
          {/* Order Items */}
          <Card className="border-border bg-card">
            <CardHeader>
              <CardTitle className="text-card-foreground flex items-center gap-2">
                <Package className="h-5 w-5" />
                Order Items
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow className="border-border">
                    <TableHead>Product</TableHead>
                    <TableHead>SKU</TableHead>
                    <TableHead>Price</TableHead>
                    <TableHead>Quantity</TableHead>
                    <TableHead>Total</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {order.products?.map((item: any, index: number) => (
                    <TableRow key={index} className="border-border">
                      <TableCell>
                        <div className="flex items-center gap-3">
                          {item.product?.images?.[0] && (
                            <img
                              src={item.product.images[0]}
                              alt={item.product.name}
                              className="h-10 w-10 rounded border border-border object-cover"
                            />
                          )}
                          <span className="font-medium">
                            {item.product?.name || "Product"}
                          </span>
                        </div>
                      </TableCell>
                      <TableCell className="text-muted-foreground">
                        {item.product?.sku || "N/A"}
                      </TableCell>
                      <TableCell>${item.price?.toFixed(2)}</TableCell>
                      <TableCell>{item.quantity}</TableCell>
                      <TableCell className="font-medium">
                        ${(item.price * item.quantity).toFixed(2)}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>

          {/* Customer Information */}
          <Card className="border-border bg-card">
            <CardHeader>
              <CardTitle className="text-card-foreground flex items-center gap-2">
                <User className="h-5 w-5" />
                Customer Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="text-sm font-medium text-muted-foreground">
                  Name
                </label>
                <p className="text-foreground">{order.user?.name || "N/A"}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-muted-foreground">
                  Email
                </label>
                <p className="text-foreground">{order.user?.email || "N/A"}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-muted-foreground">
                  Phone
                </label>
                <p className="text-foreground">{order.user?.phone || "N/A"}</p>
              </div>
            </CardContent>
          </Card>

          {/* Shipping Address */}
          <Card className="border-border bg-card">
            <CardHeader>
              <CardTitle className="text-card-foreground flex items-center gap-2">
                <MapPin className="h-5 w-5" />
                Shipping Address
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-foreground">
                {order.shippingAddress?.address}
                <br />
                {order.shippingAddress?.city},{" "}
                {order.shippingAddress?.postalCode}
                <br />
                {order.shippingAddress?.country}
              </p>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          {/* Order Status */}
          <Card className="border-border bg-card">
            <CardHeader>
              <CardTitle className="text-card-foreground">
                Order Status
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="text-sm font-medium text-muted-foreground mb-2 block">
                  Update Status
                </label>
                <Select
                  value={order.status}
                  onValueChange={handleStatusChange}
                  disabled={updating}
                >
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
            </CardContent>
          </Card>

          {/* Order Summary */}
          <Card className="border-border bg-card">
            <CardHeader>
              <CardTitle className="text-card-foreground flex items-center gap-2">
                <CreditCard className="h-5 w-5" />
                Order Summary
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Subtotal</span>
                <span className="font-medium">${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Shipping</span>
                <span className="font-medium">$0.00</span>
              </div>
              <div className="border-t border-border pt-3">
                <div className="flex justify-between text-lg font-bold">
                  <span>Total</span>
                  <span>${order.totalPrice?.toFixed(2)}</span>
                </div>
              </div>
              <div className="pt-3 border-t border-border">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Payment Method</span>
                  <span className="font-medium capitalize">
                    {order.paymentMethod}
                  </span>
                </div>
                <div className="flex justify-between text-sm mt-2">
                  <span className="text-muted-foreground">Payment Status</span>
                  <Badge
                    variant="secondary"
                    className={
                      order.payment === "paid"
                        ? "bg-green-500/10 text-green-500"
                        : "bg-yellow-500/10 text-yellow-500"
                    }
                  >
                    {order.payment || "pending"}
                  </Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
