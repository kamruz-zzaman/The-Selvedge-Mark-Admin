"use client";

import type React from "react";

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
import { ArrowLeft, Upload, X } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { categoriesApi } from "@/lib/api/categories";
import { productsApi } from "@/lib/api/products";
import apiClient from "@/lib/api/client";
import { useToast } from "@/hooks/use-toast";

export default function NewProductPage() {
  const router = useRouter();
  const [images, setImages] = useState<string[]>([]);
  const [categories, setCategories] = useState<any[]>([]);
  const [uploading, setUploading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    sku: "",
    price: "",
    stock: "",
    category: "",
    status: "active",
  });
  const { toast } = useToast();

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const response = await categoriesApi.getAll();
      setCategories(response.data);
    } catch (error) {
      console.error("Failed to fetch categories:", error);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const productData = {
        ...formData,
        price: parseFloat(formData.price),
        stock: parseInt(formData.stock),
        images,
      };

      await productsApi.create(productData);
      toast({
        title: "Success",
        description: "Product created successfully",
      });
      router.push("/admin/products");
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.response?.data?.error || "Failed to create product",
        variant: "destructive",
      });
    }
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    setUploading(true);
    try {
      const formData = new FormData();
      Array.from(files).forEach((file) => {
        formData.append("images", file);
      });

      const response = await apiClient.post("/products/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      setImages([...images, ...response.data.data]);
      toast({
        title: "Success",
        description: `${response.data.data.length} image(s) uploaded successfully`,
      });
    } catch (error) {
      console.error("Failed to upload images:", error);
      toast({
        title: "Error",
        description: "Failed to upload images. Please try again.",
        variant: "destructive",
      });
    } finally {
      setUploading(false);
    }
  };

  const removeImage = (index: number) => {
    setImages(images.filter((_, i) => i !== index));
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Link href="/admin/products">
          <Button
            variant="ghost"
            size="icon"
            className="text-foreground hover:bg-secondary"
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
        </Link>
        <div>
          <h1 className="text-3xl font-semibold text-foreground">
            Add New Product
          </h1>
          <p className="text-muted-foreground">Create a new product listing</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid gap-6 lg:grid-cols-3">
          <div className="lg:col-span-2 space-y-6">
            <Card className="border-border bg-card">
              <CardHeader>
                <CardTitle className="text-card-foreground">
                  Basic Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name" className="text-foreground">
                    Product Name
                  </Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    placeholder="Classic Selvedge Denim Jeans"
                    required
                    className="bg-secondary text-foreground placeholder:text-muted-foreground"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="description" className="text-foreground">
                    Description
                  </Label>
                  <Textarea
                    id="description"
                    value={formData.description}
                    onChange={(e) =>
                      setFormData({ ...formData, description: e.target.value })
                    }
                    placeholder="Detailed product description..."
                    rows={6}
                    className="bg-secondary text-foreground placeholder:text-muted-foreground"
                  />
                </div>
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="sku" className="text-foreground">
                      SKU
                    </Label>
                    <Input
                      id="sku"
                      value={formData.sku}
                      onChange={(e) =>
                        setFormData({ ...formData, sku: e.target.value })
                      }
                      placeholder="SDJ-001"
                      required
                      className="bg-secondary text-foreground placeholder:text-muted-foreground"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="barcode" className="text-foreground">
                      Barcode
                    </Label>
                    <Input
                      id="barcode"
                      placeholder="123456789"
                      className="bg-secondary text-foreground placeholder:text-muted-foreground"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-border bg-card">
              <CardHeader>
                <CardTitle className="text-card-foreground">
                  Pricing & Inventory
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="price" className="text-foreground">
                      Price
                    </Label>
                    <Input
                      id="price"
                      type="number"
                      step="0.01"
                      value={formData.price}
                      onChange={(e) =>
                        setFormData({ ...formData, price: e.target.value })
                      }
                      placeholder="189.99"
                      required
                      className="bg-secondary text-foreground placeholder:text-muted-foreground"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="compare-price" className="text-foreground">
                      Compare at Price
                    </Label>
                    <Input
                      id="compare-price"
                      type="number"
                      step="0.01"
                      placeholder="249.99"
                      className="bg-secondary text-foreground placeholder:text-muted-foreground"
                    />
                  </div>
                </div>
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="stock" className="text-foreground">
                      Stock Quantity
                    </Label>
                    <Input
                      id="stock"
                      type="number"
                      value={formData.stock}
                      onChange={(e) =>
                        setFormData({ ...formData, stock: e.target.value })
                      }
                      placeholder="45"
                      required
                      className="bg-secondary text-foreground placeholder:text-muted-foreground"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="low-stock" className="text-foreground">
                      Low Stock Alert
                    </Label>
                    <Input
                      id="low-stock"
                      type="number"
                      placeholder="10"
                      className="bg-secondary text-foreground placeholder:text-muted-foreground"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-border bg-card">
              <CardHeader>
                <CardTitle className="text-card-foreground">
                  Product Images
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="grid grid-cols-4 gap-4">
                    {images.map((image, index) => (
                      <div key={index} className="relative aspect-square">
                        <img
                          src={image || "/placeholder.svg"}
                          alt={`Product ${index + 1}`}
                          className="h-full w-full rounded-lg border border-border object-cover"
                        />
                        <button
                          type="button"
                          onClick={() => removeImage(index)}
                          className="absolute -right-2 -top-2 rounded-full bg-destructive p-1 text-destructive-foreground hover:bg-destructive/90"
                        >
                          <X className="h-3 w-3" />
                        </button>
                      </div>
                    ))}
                    <label className="flex aspect-square items-center justify-center rounded-lg border-2 border-dashed border-border bg-secondary hover:bg-secondary/80 cursor-pointer">
                      <input
                        type="file"
                        multiple
                        accept="image/*"
                        onChange={handleImageUpload}
                        className="hidden"
                        disabled={uploading}
                      />
                      <div className="text-center">
                        <Upload className="mx-auto h-8 w-8 text-muted-foreground" />
                        <p className="mt-2 text-xs text-muted-foreground">
                          {uploading ? "Uploading..." : "Upload"}
                        </p>
                      </div>
                    </label>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="space-y-6">
            <Card className="border-border bg-card">
              <CardHeader>
                <CardTitle className="text-card-foreground">
                  Organization
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="category" className="text-foreground">
                    Category
                  </Label>
                  <Select
                    value={formData.category}
                    onValueChange={(value) =>
                      setFormData({ ...formData, category: value })
                    }
                  >
                    <SelectTrigger className="bg-secondary text-foreground">
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent className="bg-popover text-popover-foreground">
                      {categories.map((cat) => (
                        <SelectItem key={cat._id} value={cat._id}>
                          {cat.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="status" className="text-foreground">
                    Status
                  </Label>
                  <Select defaultValue="active">
                    <SelectTrigger className="bg-secondary text-foreground">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-popover text-popover-foreground">
                      <SelectItem value="active">Active</SelectItem>
                      <SelectItem value="draft">Draft</SelectItem>
                      <SelectItem value="archived">Archived</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="tags" className="text-foreground">
                    Tags
                  </Label>
                  <Input
                    id="tags"
                    placeholder="selvedge, raw, denim"
                    className="bg-secondary text-foreground placeholder:text-muted-foreground"
                  />
                </div>
              </CardContent>
            </Card>

            <Card className="border-border bg-card">
              <CardHeader>
                <CardTitle className="text-card-foreground">SEO</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="meta-title" className="text-foreground">
                    Meta Title
                  </Label>
                  <Input
                    id="meta-title"
                    placeholder="Product title for search engines"
                    className="bg-secondary text-foreground placeholder:text-muted-foreground"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="meta-description" className="text-foreground">
                    Meta Description
                  </Label>
                  <Textarea
                    id="meta-description"
                    placeholder="Brief description for search results"
                    rows={3}
                    className="bg-secondary text-foreground placeholder:text-muted-foreground"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="url-slug" className="text-foreground">
                    URL Slug
                  </Label>
                  <Input
                    id="url-slug"
                    placeholder="classic-selvedge-denim-jeans"
                    className="bg-secondary text-foreground placeholder:text-muted-foreground"
                  />
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        <div className="flex justify-end gap-4">
          <Link href="/admin/products">
            <Button
              type="button"
              variant="outline"
              className="border-border text-foreground hover:bg-secondary bg-transparent"
            >
              Cancel
            </Button>
          </Link>
          <Button
            type="submit"
            className="bg-primary text-primary-foreground hover:bg-primary/90"
          >
            Create Product
          </Button>
        </div>
      </form>
    </div>
  );
}
