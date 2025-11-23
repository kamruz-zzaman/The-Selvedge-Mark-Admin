"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
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
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { ArrowLeft, Plus, Search, X, ShoppingCart } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { customersApi } from "@/lib/api/customers";
import { productsApi } from "@/lib/api/products";
import { ordersApi } from "@/lib/api/orders";
import { useToast } from "@/hooks/use-toast";

interface LineItem {
  product: any;
  quantity: number;
  price: number;
}

export default function CreateOrderPage() {
  const router = useRouter();
  const { toast } = useToast();

  const [customers, setCustomers] = useState<any[]>([]);
  const [products, setProducts] = useState<any[]>([]);
  const [selectedCustomer, setSelectedCustomer] = useState<string>("");
  const [lineItems, setLineItems] = useState<LineItem[]>([]);
  const [searchProduct, setSearchProduct] = useState("");
  const [shippingCost, setShippingCost] = useState("0");
  const [notes, setNotes] = useState("");
  const [loading, setLoading] = useState(false);

  // New customer dialog
  const [isNewCustomerOpen, setIsNewCustomerOpen] = useState(false);
  const [newCustomer, setNewCustomer] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    postalCode: "",
    country: "USA",
  });

  useEffect(() => {
    fetchCustomers();
    fetchProducts();
  }, []);

  const fetchCustomers = async () => {
    try {
      const response = await customersApi.getAll();
      setCustomers(response.data);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to fetch customers",
        variant: "destructive",
      });
    }
  };

  const fetchProducts = async () => {
    try {
      const response = await productsApi.getAll();
      setProducts(response.data);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to fetch products",
        variant: "destructive",
      });
    }
  };

  const handleCreateCustomer = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await customersApi.create(newCustomer);
      setCustomers([...customers, response.data]);
      setSelectedCustomer(response.data._id);
      setIsNewCustomerOpen(false);
      setNewCustomer({
        name: "",
        email: "",
        phone: "",
        address: "",
        city: "",
        postalCode: "",
        country: "USA",
      });
      toast({
        title: "Success",
        description: "Customer created successfully",
      });
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.response?.data?.error || "Failed to create customer",
        variant: "destructive",
      });
    }
  };

  const addProduct = (product: any) => {
    const existing = lineItems.find((item) => item.product._id === product._id);
    if (existing) {
      toast({
        title: "Info",
        description: "Product already added. Update quantity in the table.",
        variant: "destructive",
      });
      return;
    }

    setLineItems([
      ...lineItems,
      {
        product,
        quantity: 1,
        price: product.price,
      },
    ]);
    setSearchProduct("");
  };

  const updateQuantity = (index: number, quantity: number) => {
    const newItems = [...lineItems];
    newItems[index].quantity = Math.max(
      1,
      Math.min(quantity, newItems[index].product.stock)
    );
    setLineItems(newItems);
  };

  const removeItem = (index: number) => {
    setLineItems(lineItems.filter((_, i) => i !== index));
  };

  const calculateSubtotal = () => {
    return lineItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  };

  const calculateTotal = () => {
    return calculateSubtotal() + parseFloat(shippingCost || "0");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!selectedCustomer) {
      toast({
        title: "Error",
        description: "Please select a customer",
        variant: "destructive",
      });
      return;
    }

    if (lineItems.length === 0) {
      toast({
        title: "Error",
        description: "Please add at least one product",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);
    try {
      const customer = customers.find((c) => c._id === selectedCustomer);
      const orderData = {
        user: selectedCustomer,
        products: lineItems.map((item) => ({
          product: item.product._id,
          quantity: item.quantity,
          price: item.price,
        })),
        shippingAddress: {
          address: customer.address || "N/A",
          city: customer.city || "N/A",
          postalCode: customer.postalCode || "00000",
          country: customer.country || "USA",
        },
        paymentMethod: "manual",
        totalPrice: calculateTotal(),
        payment: "pending",
        status: "pending",
        notes,
      };

      await ordersApi.create(orderData);
      toast({
        title: "Success",
        description: "Order created successfully",
      });
      router.push("/admin/orders");
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.response?.data?.error || "Failed to create order",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const filteredProducts = products.filter(
    (p) =>
      p.name.toLowerCase().includes(searchProduct.toLowerCase()) ||
      p.sku.toLowerCase().includes(searchProduct.toLowerCase())
  );

  return (
    <div className="space-y-6">
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
          <h1 className="text-3xl font-bold text-foreground">Create Order</h1>
          <p className="text-muted-foreground">Create a new order manually</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid gap-6 lg:grid-cols-3">
          <div className="lg:col-span-2 space-y-6">
            {/* Customer Selection */}
            <Card className="border-border bg-card">
              <CardHeader>
                <CardTitle className="text-card-foreground">Customer</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex gap-2">
                  <div className="flex-1">
                    <Select
                      value={selectedCustomer}
                      onValueChange={setSelectedCustomer}
                    >
                      <SelectTrigger className="bg-secondary text-foreground">
                        <SelectValue placeholder="Select customer" />
                      </SelectTrigger>
                      <SelectContent className="bg-popover text-popover-foreground">
                        {customers.map((customer) => (
                          <SelectItem key={customer._id} value={customer._id}>
                            {customer.name} ({customer.email})
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <Dialog
                    open={isNewCustomerOpen}
                    onOpenChange={setIsNewCustomerOpen}
                  >
                    <DialogTrigger asChild>
                      <Button
                        type="button"
                        variant="outline"
                        className="border-border"
                      >
                        <Plus className="h-4 w-4 mr-2" />
                        New Customer
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="bg-card text-card-foreground max-w-2xl">
                      <DialogHeader>
                        <DialogTitle>Create New Customer</DialogTitle>
                      </DialogHeader>
                      <form
                        onSubmit={handleCreateCustomer}
                        className="space-y-4"
                      >
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <Label>Name *</Label>
                            <Input
                              value={newCustomer.name}
                              onChange={(e) =>
                                setNewCustomer({
                                  ...newCustomer,
                                  name: e.target.value,
                                })
                              }
                              required
                              className="bg-background border-border"
                            />
                          </div>
                          <div>
                            <Label>Email *</Label>
                            <Input
                              type="email"
                              value={newCustomer.email}
                              onChange={(e) =>
                                setNewCustomer({
                                  ...newCustomer,
                                  email: e.target.value,
                                })
                              }
                              required
                              className="bg-background border-border"
                            />
                          </div>
                          <div>
                            <Label>Phone</Label>
                            <Input
                              value={newCustomer.phone}
                              onChange={(e) =>
                                setNewCustomer({
                                  ...newCustomer,
                                  phone: e.target.value,
                                })
                              }
                              className="bg-background border-border"
                            />
                          </div>
                          <div>
                            <Label>City</Label>
                            <Input
                              value={newCustomer.city}
                              onChange={(e) =>
                                setNewCustomer({
                                  ...newCustomer,
                                  city: e.target.value,
                                })
                              }
                              className="bg-background border-border"
                            />
                          </div>
                          <div className="col-span-2">
                            <Label>Address</Label>
                            <Input
                              value={newCustomer.address}
                              onChange={(e) =>
                                setNewCustomer({
                                  ...newCustomer,
                                  address: e.target.value,
                                })
                              }
                              className="bg-background border-border"
                            />
                          </div>
                          <div>
                            <Label>Postal Code</Label>
                            <Input
                              value={newCustomer.postalCode}
                              onChange={(e) =>
                                setNewCustomer({
                                  ...newCustomer,
                                  postalCode: e.target.value,
                                })
                              }
                              className="bg-background border-border"
                            />
                          </div>
                          <div>
                            <Label>Country</Label>
                            <Input
                              value={newCustomer.country}
                              onChange={(e) =>
                                setNewCustomer({
                                  ...newCustomer,
                                  country: e.target.value,
                                })
                              }
                              className="bg-background border-border"
                            />
                          </div>
                        </div>
                        <div className="flex justify-end gap-2">
                          <Button
                            type="button"
                            variant="outline"
                            onClick={() => setIsNewCustomerOpen(false)}
                          >
                            Cancel
                          </Button>
                          <Button
                            type="submit"
                            className="bg-primary text-primary-foreground"
                          >
                            Create Customer
                          </Button>
                        </div>
                      </form>
                    </DialogContent>
                  </Dialog>
                </div>
              </CardContent>
            </Card>

            {/* Product Selection */}
            <Card className="border-border bg-card">
              <CardHeader>
                <CardTitle className="text-card-foreground">Products</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    placeholder="Search products..."
                    value={searchProduct}
                    onChange={(e) => setSearchProduct(e.target.value)}
                    className="pl-10 bg-secondary text-foreground"
                  />
                </div>

                {searchProduct && filteredProducts.length > 0 && (
                  <div className="border border-border rounded-lg max-h-48 overflow-y-auto">
                    {filteredProducts.slice(0, 5).map((product) => (
                      <div
                        key={product._id}
                        className="p-3 hover:bg-secondary cursor-pointer flex items-center justify-between"
                        onClick={() => addProduct(product)}
                      >
                        <div>
                          <p className="font-medium text-foreground">
                            {product.name}
                          </p>
                          <p className="text-sm text-muted-foreground">
                            ${product.price} • Stock: {product.stock}
                          </p>
                        </div>
                        <Plus className="h-4 w-4 text-muted-foreground" />
                      </div>
                    ))}
                  </div>
                )}

                {/* Line Items */}
                {lineItems.length > 0 && (
                  <Table>
                    <TableHeader>
                      <TableRow className="border-border">
                        <TableHead>Product</TableHead>
                        <TableHead>Price</TableHead>
                        <TableHead>Quantity</TableHead>
                        <TableHead>Total</TableHead>
                        <TableHead></TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {lineItems.map((item, index) => (
                        <TableRow key={index} className="border-border">
                          <TableCell className="font-medium">
                            {item.product.name}
                          </TableCell>
                          <TableCell>${item.price.toFixed(2)}</TableCell>
                          <TableCell>
                            <Input
                              type="number"
                              min="1"
                              max={item.product.stock}
                              value={item.quantity}
                              onChange={(e) =>
                                updateQuantity(index, parseInt(e.target.value))
                              }
                              className="w-20 bg-secondary"
                            />
                          </TableCell>
                          <TableCell>
                            ${(item.price * item.quantity).toFixed(2)}
                          </TableCell>
                          <TableCell>
                            <Button
                              type="button"
                              variant="ghost"
                              size="icon"
                              onClick={() => removeItem(index)}
                              className="text-destructive"
                            >
                              <X className="h-4 w-4" />
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Order Summary */}
          <div className="space-y-6">
            <Card className="border-border bg-card">
              <CardHeader>
                <CardTitle className="text-card-foreground">
                  Order Summary
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Subtotal</span>
                  <span className="font-medium">
                    ${calculateSubtotal().toFixed(2)}
                  </span>
                </div>
                <div>
                  <Label className="text-sm">Shipping Cost</Label>
                  <Input
                    type="number"
                    step="0.01"
                    value={shippingCost}
                    onChange={(e) => setShippingCost(e.target.value)}
                    className="mt-1 bg-secondary"
                  />
                </div>
                <div className="border-t border-border pt-4">
                  <div className="flex justify-between text-lg font-bold">
                    <span>Total</span>
                    <span>${calculateTotal().toFixed(2)}</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-border bg-card">
              <CardHeader>
                <CardTitle className="text-card-foreground">Notes</CardTitle>
              </CardHeader>
              <CardContent>
                <Textarea
                  placeholder="Add order notes..."
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  rows={4}
                  className="bg-secondary"
                />
              </CardContent>
            </Card>

            <Button
              type="submit"
              disabled={loading || !selectedCustomer || lineItems.length === 0}
              className="w-full bg-primary text-primary-foreground"
            >
              <ShoppingCart className="mr-2 h-4 w-4" />
              {loading ? "Creating..." : "Create Order"}
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
}
