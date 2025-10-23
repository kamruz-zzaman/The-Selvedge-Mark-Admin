"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, Edit, Trash2 } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"

export default function ProductViewPage({ params }: { params: { id: string } }) {
  const router = useRouter()

  const product = {
    id: params.id,
    name: "Classic Selvedge Denim Jeans",
    sku: "SDJ-001",
    category: "Jeans",
    stock: 45,
    price: 189.99,
    comparePrice: 249.99,
    cost: 95.0,
    status: "active",
    description:
      "Premium selvedge denim jeans crafted from Japanese raw denim. Features authentic shuttle-loom construction with red selvedge line detail.",
    images: ["/denim-jeans.png"],
    variants: [
      { size: "30", color: "Indigo", stock: 12, sku: "SDJ-001-30-IND" },
      { size: "32", color: "Indigo", stock: 15, sku: "SDJ-001-32-IND" },
      { size: "34", color: "Indigo", stock: 18, sku: "SDJ-001-34-IND" },
    ],
    tags: ["selvedge", "raw denim", "premium"],
    seo: {
      title: "Classic Selvedge Denim Jeans | Selvedge Mark",
      description: "Premium Japanese selvedge denim jeans with authentic construction",
    },
  }

  const handleDelete = () => {
    if (confirm("Are you sure you want to delete this product?")) {
      console.log("[v0] Delete product:", product.id)
      router.push("/admin/products")
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link href="/admin/products">
            <Button variant="ghost" size="icon" className="text-foreground hover:bg-secondary">
              <ArrowLeft className="h-5 w-5" />
            </Button>
          </Link>
          <div>
            <h1 className="text-3xl font-semibold text-foreground">{product.name}</h1>
            <p className="text-muted-foreground">SKU: {product.sku}</p>
          </div>
        </div>
        <div className="flex gap-2">
          <Link href={`/admin/products/${product.id}/edit`}>
            <Button className="bg-primary text-primary-foreground hover:bg-primary/90">
              <Edit className="mr-2 h-4 w-4" />
              Edit
            </Button>
          </Link>
          <Button
            variant="outline"
            className="border-destructive text-destructive hover:bg-destructive hover:text-destructive-foreground bg-transparent"
            onClick={handleDelete}
          >
            <Trash2 className="mr-2 h-4 w-4" />
            Delete
          </Button>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2 space-y-6">
          <Card className="border-border bg-card">
            <CardHeader>
              <CardTitle className="text-card-foreground">Product Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="text-sm font-medium text-muted-foreground">Description</label>
                <p className="mt-1 text-foreground">{product.description}</p>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Price</label>
                  <p className="mt-1 text-2xl font-semibold text-foreground">${product.price}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Compare at Price</label>
                  <p className="mt-1 text-2xl font-semibold text-muted-foreground line-through">
                    ${product.comparePrice}
                  </p>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Cost</label>
                  <p className="mt-1 text-foreground">${product.cost}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Margin</label>
                  <p className="mt-1 text-foreground">
                    {(((product.price - product.cost) / product.price) * 100).toFixed(1)}%
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-border bg-card">
            <CardHeader>
              <CardTitle className="text-card-foreground">Variants</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {product.variants.map((variant, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between border-b border-border pb-3 last:border-0 last:pb-0"
                  >
                    <div>
                      <p className="font-medium text-foreground">
                        Size {variant.size} - {variant.color}
                      </p>
                      <p className="text-sm text-muted-foreground">SKU: {variant.sku}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-foreground">Stock: {variant.stock}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card className="border-border bg-card">
            <CardHeader>
              <CardTitle className="text-card-foreground">SEO</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div>
                <label className="text-sm font-medium text-muted-foreground">Page Title</label>
                <p className="mt-1 text-foreground">{product.seo.title}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-muted-foreground">Meta Description</label>
                <p className="mt-1 text-foreground">{product.seo.description}</p>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          <Card className="border-border bg-card">
            <CardHeader>
              <CardTitle className="text-card-foreground">Status</CardTitle>
            </CardHeader>
            <CardContent>
              <Badge
                variant={product.status === "active" ? "default" : "secondary"}
                className={
                  product.status === "active"
                    ? "bg-green-500/10 text-green-500 hover:bg-green-500/20"
                    : "bg-secondary text-muted-foreground"
                }
              >
                {product.status}
              </Badge>
            </CardContent>
          </Card>

          <Card className="border-border bg-card">
            <CardHeader>
              <CardTitle className="text-card-foreground">Product Image</CardTitle>
            </CardHeader>
            <CardContent>
              <img
                src={product.images[0] || "/placeholder.svg"}
                alt={product.name}
                className="w-full rounded border border-border object-cover"
              />
            </CardContent>
          </Card>

          <Card className="border-border bg-card">
            <CardHeader>
              <CardTitle className="text-card-foreground">Organization</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div>
                <label className="text-sm font-medium text-muted-foreground">Category</label>
                <p className="mt-1 text-foreground">{product.category}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-muted-foreground">Tags</label>
                <div className="mt-1 flex flex-wrap gap-2">
                  {product.tags.map((tag) => (
                    <Badge key={tag} variant="secondary" className="bg-secondary text-foreground">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-border bg-card">
            <CardHeader>
              <CardTitle className="text-card-foreground">Inventory</CardTitle>
            </CardHeader>
            <CardContent>
              <div>
                <label className="text-sm font-medium text-muted-foreground">Total Stock</label>
                <p className="mt-1 text-2xl font-semibold text-foreground">{product.stock}</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
