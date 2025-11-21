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
import { Plus, Search, MoreVertical, Edit, Trash2, Copy } from "lucide-react";
import { promotionsApi } from "@/lib/api/promotions";

export default function PromotionsPage() {
  const [promotions, setPromotions] = useState<any[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPromotions();
  }, []);

  const fetchPromotions = async () => {
    try {
      const response = await promotionsApi.getAll();
      setPromotions(response.data);
    } catch (error) {
      console.error("Failed to fetch promotions:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this promotion?")) return;

    try {
      await promotionsApi.delete(id);
      setPromotions(promotions.filter((p) => p._id !== id));
    } catch (error) {
      console.error("Failed to delete promotion:", error);
    }
  };

  const filteredPromotions = promotions.filter((promo) =>
    promo.code.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <p className="text-muted-foreground">Loading promotions...</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-semibold text-foreground">Promotions</h1>
          <p className="text-muted-foreground">
            Manage discount codes and promotions
          </p>
        </div>
        <Button className="bg-primary text-primary-foreground hover:bg-primary/90">
          <Plus className="mr-2 h-4 w-4" />
          Create Promotion
        </Button>
      </div>

      <Card className="border-border bg-card">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-card-foreground">
              All Promotions
            </CardTitle>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Search promotions..."
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
                <TableHead className="text-muted-foreground">Code</TableHead>
                <TableHead className="text-muted-foreground">Type</TableHead>
                <TableHead className="text-muted-foreground">Value</TableHead>
                <TableHead className="text-muted-foreground">Usage</TableHead>
                <TableHead className="text-muted-foreground">
                  Start Date
                </TableHead>
                <TableHead className="text-muted-foreground">
                  End Date
                </TableHead>
                <TableHead className="text-muted-foreground">Status</TableHead>
                <TableHead className="text-muted-foreground"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredPromotions.map((promo) => (
                <TableRow
                  key={promo._id}
                  className="border-border hover:bg-secondary/50"
                >
                  <TableCell className="font-mono font-medium text-foreground">
                    {promo.code}
                  </TableCell>
                  <TableCell className="text-muted-foreground">
                    {promo.type}
                  </TableCell>
                  <TableCell className="text-foreground">
                    {promo.type === "percentage"
                      ? `${promo.value}%`
                      : promo.type === "fixed"
                      ? `$${promo.value}`
                      : "Free"}
                  </TableCell>
                  <TableCell className="text-muted-foreground">
                    {promo.usage ||
                      `${promo.usageCount}/${promo.usageLimit || "∞"}`}
                  </TableCell>
                  <TableCell className="text-muted-foreground">
                    {new Date(promo.startDate).toLocaleDateString()}
                  </TableCell>
                  <TableCell className="text-muted-foreground">
                    {new Date(promo.endDate).toLocaleDateString()}
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant="secondary"
                      className={
                        promo.status === "active"
                          ? "bg-green-500/10 text-green-500"
                          : promo.status === "scheduled"
                          ? "bg-blue-500/10 text-blue-500"
                          : "bg-secondary text-muted-foreground"
                      }
                    >
                      {promo.status}
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
                        <DropdownMenuItem
                          onClick={() =>
                            navigator.clipboard.writeText(promo.code)
                          }
                        >
                          <Copy className="mr-2 h-4 w-4" />
                          Copy Code
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Edit className="mr-2 h-4 w-4" />
                          Edit
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          className="text-destructive"
                          onClick={() => handleDelete(promo._id)}
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
