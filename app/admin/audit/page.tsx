"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Search, Filter } from "lucide-react"

const auditLogs = [
  {
    id: "1",
    action: "Product Updated",
    user: "admin@selvedgemark.com",
    resource: "Classic Selvedge Denim Jeans",
    details: "Updated price from $179.99 to $189.99",
    timestamp: "2024-01-16 14:32:15",
    type: "update",
  },
  {
    id: "2",
    action: "Order Created",
    user: "system",
    resource: "Order #1005",
    details: "New order from David Wilson",
    timestamp: "2024-01-16 14:15:42",
    type: "create",
  },
  {
    id: "3",
    action: "Customer Deleted",
    user: "admin@selvedgemark.com",
    resource: "Customer #234",
    details: "Deleted customer account at user request",
    timestamp: "2024-01-16 13:45:22",
    type: "delete",
  },
  {
    id: "4",
    action: "Settings Changed",
    user: "admin@selvedgemark.com",
    resource: "Store Settings",
    details: "Updated tax rate from 8.0% to 8.5%",
    timestamp: "2024-01-16 12:20:10",
    type: "update",
  },
  {
    id: "5",
    action: "User Login",
    user: "admin@selvedgemark.com",
    resource: "Admin Panel",
    details: "Successful login from IP 192.168.1.1",
    timestamp: "2024-01-16 09:00:05",
    type: "auth",
  },
  {
    id: "6",
    action: "Product Created",
    user: "admin@selvedgemark.com",
    resource: "Denim Shirt",
    details: "Added new product to catalog",
    timestamp: "2024-01-15 16:45:30",
    type: "create",
  },
  {
    id: "7",
    action: "Order Status Changed",
    user: "admin@selvedgemark.com",
    resource: "Order #1003",
    details: "Changed status from processing to shipped",
    timestamp: "2024-01-15 15:20:18",
    type: "update",
  },
  {
    id: "8",
    action: "Promotion Created",
    user: "admin@selvedgemark.com",
    resource: "SUMMER25",
    details: "Created 25% off promotion code",
    timestamp: "2024-01-15 11:10:45",
    type: "create",
  },
]

export default function AuditLogsPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [filterType, setFilterType] = useState("all")

  const filteredLogs = auditLogs.filter((log) => {
    const matchesSearch =
      log.action.toLowerCase().includes(searchQuery.toLowerCase()) ||
      log.user.toLowerCase().includes(searchQuery.toLowerCase()) ||
      log.resource.toLowerCase().includes(searchQuery.toLowerCase())

    const matchesType = filterType === "all" || log.type === filterType

    return matchesSearch && matchesType
  })

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-semibold text-foreground">Audit Logs</h1>
          <p className="text-muted-foreground">Track all system activities and changes</p>
        </div>
      </div>

      <Card className="border-border bg-card">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-card-foreground">Activity Log</CardTitle>
            <div className="flex items-center gap-2">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  placeholder="Search logs..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-64 pl-10 bg-secondary text-foreground placeholder:text-muted-foreground"
                />
              </div>
              <Select value={filterType} onValueChange={setFilterType}>
                <SelectTrigger className="w-40 bg-secondary text-foreground">
                  <Filter className="mr-2 h-4 w-4" />
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-popover text-popover-foreground">
                  <SelectItem value="all">All Types</SelectItem>
                  <SelectItem value="create">Create</SelectItem>
                  <SelectItem value="update">Update</SelectItem>
                  <SelectItem value="delete">Delete</SelectItem>
                  <SelectItem value="auth">Authentication</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow className="border-border hover:bg-transparent">
                <TableHead className="text-muted-foreground">Action</TableHead>
                <TableHead className="text-muted-foreground">User</TableHead>
                <TableHead className="text-muted-foreground">Resource</TableHead>
                <TableHead className="text-muted-foreground">Details</TableHead>
                <TableHead className="text-muted-foreground">Timestamp</TableHead>
                <TableHead className="text-muted-foreground">Type</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredLogs.map((log) => (
                <TableRow key={log.id} className="border-border hover:bg-secondary/50">
                  <TableCell className="font-medium text-foreground">{log.action}</TableCell>
                  <TableCell className="text-muted-foreground">{log.user}</TableCell>
                  <TableCell className="text-foreground">{log.resource}</TableCell>
                  <TableCell className="text-muted-foreground">{log.details}</TableCell>
                  <TableCell className="font-mono text-xs text-muted-foreground">{log.timestamp}</TableCell>
                  <TableCell>
                    <Badge
                      variant="secondary"
                      className={
                        log.type === "create"
                          ? "bg-green-500/10 text-green-500"
                          : log.type === "update"
                            ? "bg-blue-500/10 text-blue-500"
                            : log.type === "delete"
                              ? "bg-destructive/10 text-destructive"
                              : "bg-secondary text-muted-foreground"
                      }
                    >
                      {log.type}
                    </Badge>
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
