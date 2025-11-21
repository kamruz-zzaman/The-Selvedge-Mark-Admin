"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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
  Search,
  AlertTriangle,
  Package,
  TrendingDown,
  TrendingUp,
} from "lucide-react";
import { inventoryApi } from "@/lib/api/inventory";

export default function InventoryPage() {
  const [inventory, setInventory] = useState<any[]>([]);
  const [stats, setStats] = useState<any>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [inventoryRes, statsRes] = await Promise.all([
        inventoryApi.getAll(),
        inventoryApi.getStats(),
      ]);
      setInventory(inventoryRes.data);
      setStats(statsRes.data);
    } catch (error) {
      console.error("Failed to fetch inventory:", error);
    } finally {
      setLoading(false);
    }
  };

  const filteredInventory = inventory.filter(
    (item) =>
      item.product.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.sku.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <p className="text-muted-foreground">Loading inventory...</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-semibold text-foreground">Inventory</h1>
          <p className="text-muted-foreground">Track and manage stock levels</p>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-4">
        <Card className="border-border bg-card">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Total Products
            </CardTitle>
            <Package className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">
              {stats.totalProducts}
            </div>
          </CardContent>
        </Card>

        <Card className="border-border bg-card">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Low Stock
            </CardTitle>
            <TrendingDown className="h-4 w-4 text-yellow-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-yellow-500">
              {stats.lowStock}
            </div>
          </CardContent>
        </Card>

        <Card className="border-border bg-card">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Out of Stock
            </CardTitle>
            <AlertTriangle className="h-4 w-4 text-destructive" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-destructive">
              {stats.outOfStock}
            </div>
          </CardContent>
        </Card>

        <Card className="border-border bg-card">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Total Value
            </CardTitle>
            <TrendingUp className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">
              ${stats.totalValue.toLocaleString()}
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="border-border bg-card">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-card-foreground">Stock Levels</CardTitle>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Search inventory..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-64 pl-10 bg-secondary text-foreground placeholder:text-muted-foreground"
              />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow className="border-border hover:bg-transparent">
                <TableHead className="text-muted-foreground">Product</TableHead>
                <TableHead className="text-muted-foreground">SKU</TableHead>
                <TableHead className="text-muted-foreground">Stock</TableHead>
                <TableHead className="text-muted-foreground">
                  Reserved
                </TableHead>
                <TableHead className="text-muted-foreground">
                  Available
                </TableHead>
                <TableHead className="text-muted-foreground">
                  Reorder Point
                </TableHead>
                <TableHead className="text-muted-foreground">Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredInventory.map((item) => (
                <TableRow
                  key={item.id}
                  className="border-border hover:bg-secondary/50"
                >
                  <TableCell className="font-medium text-foreground">
                    {item.product}
                  </TableCell>
                  <TableCell className="font-mono text-muted-foreground">
                    {item.sku}
                  </TableCell>
                  <TableCell className="text-foreground">
                    {item.stock}
                  </TableCell>
                  <TableCell className="text-muted-foreground">
                    {item.reserved}
                  </TableCell>
                  <TableCell className="text-foreground">
                    {item.available}
                  </TableCell>
                  <TableCell className="text-muted-foreground">
                    {item.reorderPoint}
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant="secondary"
                      className={
                        item.status === "in-stock"
                          ? "bg-green-500/10 text-green-500"
                          : item.status === "low-stock"
                          ? "bg-yellow-500/10 text-yellow-500"
                          : "bg-destructive/10 text-destructive"
                      }
                    >
                      {item.status === "in-stock"
                        ? "In Stock"
                        : item.status === "low-stock"
                        ? "Low Stock"
                        : "Out of Stock"}
                    </Badge>
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
