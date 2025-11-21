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
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Search, Filter } from "lucide-react";
import { auditApi } from "@/lib/api/audit";

export default function AuditLogsPage() {
  const [logs, setLogs] = useState<any[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterType, setFilterType] = useState("all");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchLogs();
  }, [filterType, searchQuery]);

  const fetchLogs = async () => {
    try {
      const params: any = {};
      if (filterType !== "all") params.type = filterType;
      if (searchQuery) params.search = searchQuery;

      const response = await auditApi.getLogs(params);
      setLogs(response.data);
    } catch (error) {
      console.error("Failed to fetch audit logs:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <p className="text-muted-foreground">Loading audit logs...</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-semibold text-foreground">Audit Logs</h1>
          <p className="text-muted-foreground">
            Track all system activities and changes
          </p>
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
                <TableHead className="text-muted-foreground">
                  Resource
                </TableHead>
                <TableHead className="text-muted-foreground">Details</TableHead>
                <TableHead className="text-muted-foreground">
                  Timestamp
                </TableHead>
                <TableHead className="text-muted-foreground">Type</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {logs.map((log) => (
                <TableRow
                  key={log._id}
                  className="border-border hover:bg-secondary/50"
                >
                  <TableCell className="font-medium text-foreground">
                    {log.action}
                  </TableCell>
                  <TableCell className="text-muted-foreground">
                    {log.user?.email || log.user}
                  </TableCell>
                  <TableCell className="text-foreground">
                    {log.resource}
                  </TableCell>
                  <TableCell className="text-muted-foreground">
                    {log.details}
                  </TableCell>
                  <TableCell className="font-mono text-xs text-muted-foreground">
                    {new Date(log.createdAt).toLocaleString()}
                  </TableCell>
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
  );
}
