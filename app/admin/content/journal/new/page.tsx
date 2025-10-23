"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ArrowLeft, Upload, X } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"

export default function NewJournalPostPage() {
  const router = useRouter()
  const [featuredImage, setFeaturedImage] = useState<string | null>(null)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    router.push("/admin/content/journal")
  }

  const handleImageUpload = () => {
    setFeaturedImage("/blog-featured-image.png")
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Link href="/admin/content/journal">
          <Button variant="ghost" size="icon" className="text-foreground hover:bg-secondary">
            <ArrowLeft className="h-5 w-5" />
          </Button>
        </Link>
        <div>
          <h1 className="text-3xl font-semibold text-foreground">New Journal Post</h1>
          <p className="text-muted-foreground">Create a new blog post or article</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid gap-6 lg:grid-cols-3">
          <div className="lg:col-span-2 space-y-6">
            <Card className="border-border bg-card">
              <CardHeader>
                <CardTitle className="text-card-foreground">Post Content</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="title" className="text-foreground">
                    Title
                  </Label>
                  <Input
                    id="title"
                    placeholder="Enter post title..."
                    required
                    className="bg-secondary text-foreground placeholder:text-muted-foreground"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="excerpt" className="text-foreground">
                    Excerpt
                  </Label>
                  <Textarea
                    id="excerpt"
                    placeholder="Brief summary of the post..."
                    rows={3}
                    className="bg-secondary text-foreground placeholder:text-muted-foreground"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="content" className="text-foreground">
                    Content
                  </Label>
                  <Textarea
                    id="content"
                    placeholder="Write your post content here..."
                    rows={16}
                    className="bg-secondary text-foreground placeholder:text-muted-foreground font-mono text-sm"
                  />
                </div>
              </CardContent>
            </Card>

            <Card className="border-border bg-card">
              <CardHeader>
                <CardTitle className="text-card-foreground">Featured Image</CardTitle>
              </CardHeader>
              <CardContent>
                {featuredImage ? (
                  <div className="relative">
                    <img
                      src={featuredImage || "/placeholder.svg"}
                      alt="Featured"
                      className="w-full rounded-lg border border-border"
                    />
                    <button
                      type="button"
                      onClick={() => setFeaturedImage(null)}
                      className="absolute right-2 top-2 rounded-full bg-destructive p-2 text-destructive-foreground hover:bg-destructive/90"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  </div>
                ) : (
                  <button
                    type="button"
                    onClick={handleImageUpload}
                    className="flex w-full flex-col items-center justify-center rounded-lg border-2 border-dashed border-border bg-secondary py-12 hover:bg-secondary/80"
                  >
                    <Upload className="h-12 w-12 text-muted-foreground" />
                    <p className="mt-2 text-sm text-muted-foreground">Click to upload featured image</p>
                  </button>
                )}
              </CardContent>
            </Card>
          </div>

          <div className="space-y-6">
            <Card className="border-border bg-card">
              <CardHeader>
                <CardTitle className="text-card-foreground">Publish</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="status" className="text-foreground">
                    Status
                  </Label>
                  <Select defaultValue="draft">
                    <SelectTrigger className="bg-secondary text-foreground">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-popover text-popover-foreground">
                      <SelectItem value="draft">Draft</SelectItem>
                      <SelectItem value="published">Published</SelectItem>
                      <SelectItem value="scheduled">Scheduled</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="publish-date" className="text-foreground">
                    Publish Date
                  </Label>
                  <Input
                    id="publish-date"
                    type="date"
                    className="bg-secondary text-foreground placeholder:text-muted-foreground"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="author" className="text-foreground">
                    Author
                  </Label>
                  <Select defaultValue="admin">
                    <SelectTrigger className="bg-secondary text-foreground">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-popover text-popover-foreground">
                      <SelectItem value="admin">Admin</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>

            <Card className="border-border bg-card">
              <CardHeader>
                <CardTitle className="text-card-foreground">Categories & Tags</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="category" className="text-foreground">
                    Category
                  </Label>
                  <Select>
                    <SelectTrigger className="bg-secondary text-foreground">
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent className="bg-popover text-popover-foreground">
                      <SelectItem value="style">Style Guide</SelectItem>
                      <SelectItem value="care">Care Tips</SelectItem>
                      <SelectItem value="news">News</SelectItem>
                      <SelectItem value="collection">Collections</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="tags" className="text-foreground">
                    Tags
                  </Label>
                  <Input
                    id="tags"
                    placeholder="denim, fashion, style"
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
                    placeholder="SEO title"
                    className="bg-secondary text-foreground placeholder:text-muted-foreground"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="meta-description" className="text-foreground">
                    Meta Description
                  </Label>
                  <Textarea
                    id="meta-description"
                    placeholder="SEO description"
                    rows={3}
                    className="bg-secondary text-foreground placeholder:text-muted-foreground"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="slug" className="text-foreground">
                    URL Slug
                  </Label>
                  <Input
                    id="slug"
                    placeholder="post-url-slug"
                    className="bg-secondary text-foreground placeholder:text-muted-foreground"
                  />
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        <div className="flex justify-end gap-4">
          <Link href="/admin/content/journal">
            <Button
              type="button"
              variant="outline"
              className="border-border text-foreground hover:bg-secondary bg-transparent"
            >
              Cancel
            </Button>
          </Link>
          <Button type="submit" className="bg-primary text-primary-foreground hover:bg-primary/90">
            Publish Post
          </Button>
        </div>
      </form>
    </div>
  )
}
