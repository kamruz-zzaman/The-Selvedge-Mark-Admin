"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Edit, Eye } from "lucide-react"

const pages = [
  { id: "1", title: "About Us", slug: "/about", status: "published", lastModified: "2024-01-10" },
  { id: "2", title: "Terms of Service", slug: "/terms", status: "published", lastModified: "2023-12-15" },
  { id: "3", title: "Privacy Policy", slug: "/privacy", status: "published", lastModified: "2023-12-15" },
  { id: "4", title: "FAQ", slug: "/faq", status: "published", lastModified: "2024-01-05" },
  { id: "5", title: "Contact", slug: "/contact", status: "published", lastModified: "2023-11-20" },
  { id: "6", title: "Shipping Info", slug: "/shipping", status: "published", lastModified: "2024-01-08" },
  { id: "7", title: "Returns", slug: "/returns", status: "published", lastModified: "2024-01-08" },
  { id: "8", title: "Size Guide", slug: "/size-guide", status: "draft", lastModified: "2024-01-12" },
]

export default function PagesPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-semibold text-foreground">Pages</h1>
          <p className="text-muted-foreground">Manage static pages and content</p>
        </div>
      </div>

      <Card className="border-border bg-card">
        <CardHeader>
          <CardTitle className="text-card-foreground">All Pages</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow className="border-border hover:bg-transparent">
                <TableHead className="text-muted-foreground">Page Title</TableHead>
                <TableHead className="text-muted-foreground">URL</TableHead>
                <TableHead className="text-muted-foreground">Status</TableHead>
                <TableHead className="text-muted-foreground">Last Modified</TableHead>
                <TableHead className="text-muted-foreground"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {pages.map((page) => (
                <TableRow key={page.id} className="border-border hover:bg-secondary/50">
                  <TableCell className="font-medium text-foreground">{page.title}</TableCell>
                  <TableCell className="text-muted-foreground">{page.slug}</TableCell>
                  <TableCell>
                    <Badge
                      variant="secondary"
                      className={
                        page.status === "published"
                          ? "bg-green-500/10 text-green-500"
                          : "bg-yellow-500/10 text-yellow-500"
                      }
                    >
                      {page.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-muted-foreground">{page.lastModified}</TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-foreground">
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-foreground">
                        <Edit className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}
