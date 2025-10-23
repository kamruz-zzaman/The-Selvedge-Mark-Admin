"use client"

import { Card, CardHeader, CardTitle } from "@/components/ui/card"
import { FileText, BookOpen, ImageIcon, Settings } from "lucide-react"
import Link from "next/link"

export default function ContentPage() {
  const contentSections = [
    {
      title: "Journal Posts",
      description: "Manage blog posts and articles",
      icon: BookOpen,
      href: "/admin/content/journal",
      count: 24,
    },
    {
      title: "Pages",
      description: "Edit static pages like About, Terms, etc.",
      icon: FileText,
      href: "/admin/content/pages",
      count: 8,
    },
    {
      title: "Media Library",
      description: "Manage images and media files",
      icon: ImageIcon,
      href: "/admin/content/media",
      count: 156,
    },
    {
      title: "Site Settings",
      description: "Configure site-wide content and settings",
      icon: Settings,
      href: "/admin/content/settings",
      count: null,
    },
  ]

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-semibold text-foreground">Content Management</h1>
        <p className="text-muted-foreground">Manage your site content, pages, and media</p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {contentSections.map((section) => (
          <Link key={section.title} href={section.href}>
            <Card className="border-border bg-card transition-colors hover:bg-secondary/50">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-accent/10">
                      <section.icon className="h-5 w-5 text-accent" />
                    </div>
                    <div>
                      <CardTitle className="text-card-foreground">{section.title}</CardTitle>
                      <p className="text-sm text-muted-foreground">{section.description}</p>
                    </div>
                  </div>
                  {section.count !== null && (
                    <div className="text-2xl font-bold text-card-foreground">{section.count}</div>
                  )}
                </div>
              </CardHeader>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  )
}
