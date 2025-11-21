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
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Plus,
  Search,
  Filter,
  MoreVertical,
  Edit,
  Trash2,
  Eye,
} from "lucide-react";
import Link from "next/link";
import { productsApi } from "@/lib/api/products";

export default function ProductsPage() {
  const [products, setProducts] = useState<any[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await productsApi.getAll();
      setProducts(response.data);
    } catch (error) {
      console.error("Failed to fetch products:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (confirm("Are you sure you want to delete this product?")) {
      try {
        await productsApi.delete(id);
        setProducts(products.filter((p) => p._id !== id));
      } catch (error) {
        console.error("Failed to delete product:", error);
        alert("Failed to delete product");
      }
    }
  };

  const filteredProducts = products.filter(
    (product) =>
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.sku.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <p className="text-muted-foreground">Loading products...</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-semibold text-foreground">Products</h1>
          <p className="text-muted-foreground">Manage your product catalog</p>
        </div>
        <Link href="/admin/products/new">
          <Button className="bg-primary text-primary-foreground hover:bg-primary/90">
            <Plus className="mr-2 h-4 w-4" />
            Add Product
          </Button>
        </Link>
      </div>

      <Card className="border-border bg-card">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-card-foreground">All Products</CardTitle>
            <div className="flex items-center gap-2">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  placeholder="Search products..."
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
                <TableHead className="text-muted-foreground">Product</TableHead>
                <TableHead className="text-muted-foreground">SKU</TableHead>
                <TableHead className="text-muted-foreground">
                  Category
                </TableHead>
                <TableHead className="text-muted-foreground">Stock</TableHead>
                <TableHead className="text-muted-foreground">Price</TableHead>
                <TableHead className="text-muted-foreground">Status</TableHead>
                <TableHead className="text-muted-foreground"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredProducts.map((product) => (
                <TableRow
                  key={product._id}
                  className="border-border hover:bg-secondary/50"
                >
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <img
                        src={product.images?.[0] || "/placeholder.svg"}
                        alt={product.name}
                        className="h-10 w-10 rounded border border-border object-cover"
                      />
                      <span className="font-medium text-foreground">
                        {product.name}
                      </span>
                    </div>
                  </TableCell>
                  <TableCell className="text-muted-foreground">
                    {product.sku}
                  </TableCell>
                  <TableCell className="text-muted-foreground">
                    {product.category}
                  </TableCell>
                  <TableCell>
                    <span
                      className={
                        product.stock === 0
                          ? "text-destructive"
                          : product.stock < 10
                          ? "text-yellow-500"
                          : "text-foreground"
                      }
                    >
                      {product.stock}
                    </span>
                  </TableCell>
                  <TableCell className="text-foreground">
                    ${product.price}
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant={
                        product.status === "active" ? "default" : "secondary"
                      }
                      className={
                        product.status === "active"
                          ? "bg-green-500/10 text-green-500 hover:bg-green-500/20"
                          : "bg-secondary text-muted-foreground"
                      }
                    >
                      {product.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="text-muted-foreground hover:text-foreground"
                        >
                          <MoreVertical className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent
                        align="end"
                        className="bg-popover text-popover-foreground"
                      >
                        <Link href={`/admin/products/${product._id}`}>
                          <DropdownMenuItem>
                            <Eye className="mr-2 h-4 w-4" />
                            View
                          </DropdownMenuItem>
                        </Link>
                        <Link href={`/admin/products/${product._id}/edit`}>
                          <DropdownMenuItem>
                            <Edit className="mr-2 h-4 w-4" />
                            Edit
                          </DropdownMenuItem>
                        </Link>
                        <DropdownMenuItem
                          className="text-destructive"
                          onClick={() => handleDelete(product._id)}
                        >
                          <Trash2 className="mr-2 h-4 w-4" />
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
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
