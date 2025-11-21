"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Download, TrendingUp, TrendingDown } from "lucide-react";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { reportsApi } from "@/lib/api/reports";

export default function ReportsPage() {
  const [timeRange, setTimeRange] = useState("6months");
  const [salesData, setSalesData] = useState<any[]>([]);
  const [topProducts, setTopProducts] = useState<any[]>([]);
  const [topCustomers, setTopCustomers] = useState<any[]>([]);
  const [stats, setStats] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, [timeRange]);

  const fetchData = async () => {
    try {
      const [salesRes, productsRes, customersRes] = await Promise.all([
        reportsApi.getSalesReport(timeRange),
        reportsApi.getTopProducts(5),
        reportsApi.getTopCustomers(5),
      ]);

      setSalesData(salesRes.data.salesData || []);
      setStats({
        totalRevenue: salesRes.data.totalRevenue,
        totalOrders: salesRes.data.totalOrders,
        avgOrderValue: salesRes.data.avgOrderValue,
        conversionRate: 3.24, // Mock for now
      });
      setTopProducts(productsRes.data);
      setTopCustomers(customersRes.data);
    } catch (error) {
      console.error("Failed to fetch reports:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <p className="text-muted-foreground">Loading reports...</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-semibold text-foreground">
            Reports & Analytics
          </h1>
          <p className="text-muted-foreground">
            Track your business performance
          </p>
        </div>
        <div className="flex gap-2">
          <Select value={timeRange} onValueChange={setTimeRange}>
            <SelectTrigger className="w-40 bg-secondary text-foreground">
              <SelectValue />
            </SelectTrigger>
            <SelectContent className="bg-popover text-popover-foreground">
              <SelectItem value="7days">Last 7 Days</SelectItem>
              <SelectItem value="30days">Last 30 Days</SelectItem>
              <SelectItem value="3months">Last 3 Months</SelectItem>
              <SelectItem value="6months">Last 6 Months</SelectItem>
              <SelectItem value="1year">Last Year</SelectItem>
            </SelectContent>
          </Select>
          <Button
            variant="outline"
            className="border-border text-foreground hover:bg-secondary bg-transparent"
          >
            <Download className="mr-2 h-4 w-4" />
            Export
          </Button>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-4">
        <Card className="border-border bg-card">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Revenue</p>
                <div className="text-2xl font-bold text-card-foreground">
                  ${stats?.totalRevenue?.toLocaleString() || 0}
                </div>
              </div>
              <TrendingUp className="h-8 w-8 text-green-500" />
            </div>
            <p className="mt-2 text-xs text-green-500">
              +23.5% from last period
            </p>
          </CardContent>
        </Card>
        <Card className="border-border bg-card">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Orders</p>
                <div className="text-2xl font-bold text-card-foreground">
                  {stats?.totalOrders?.toLocaleString() || 0}
                </div>
              </div>
              <TrendingUp className="h-8 w-8 text-green-500" />
            </div>
            <p className="mt-2 text-xs text-green-500">
              +18.2% from last period
            </p>
          </CardContent>
        </Card>
        <Card className="border-border bg-card">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">
                  Avg. Order Value
                </p>
                <div className="text-2xl font-bold text-card-foreground">
                  ${stats?.avgOrderValue?.toFixed(2) || 0}
                </div>
              </div>
              <TrendingDown className="h-8 w-8 text-red-500" />
            </div>
            <p className="mt-2 text-xs text-red-500">-4.3% from last period</p>
          </CardContent>
        </Card>
        <Card className="border-border bg-card">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Conversion Rate</p>
                <div className="text-2xl font-bold text-card-foreground">
                  {stats?.conversionRate?.toFixed(2) || 0}%
                </div>
              </div>
              <TrendingUp className="h-8 w-8 text-green-500" />
            </div>
            <p className="mt-2 text-xs text-green-500">
              +0.8% from last period
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <Card className="border-border bg-card">
          <CardHeader>
            <CardTitle className="text-card-foreground">
              Revenue Over Time
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={salesData}>
                <CartesianGrid strokeDasharray="3 3" stroke="oklch(0.18 0 0)" />
                <XAxis dataKey="month" stroke="oklch(0.58 0 0)" />
                <YAxis stroke="oklch(0.58 0 0)" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "oklch(0.12 0 0)",
                    border: "1px solid oklch(0.18 0 0)",
                    borderRadius: "8px",
                    color: "oklch(0.98 0 0)",
                  }}
                />
                <Line
                  type="monotone"
                  dataKey="revenue"
                  stroke="oklch(0.65 0.25 280)"
                  strokeWidth={2}
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="border-border bg-card">
          <CardHeader>
            <CardTitle className="text-card-foreground">
              Orders Over Time
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={salesData}>
                <CartesianGrid strokeDasharray="3 3" stroke="oklch(0.18 0 0)" />
                <XAxis dataKey="month" stroke="oklch(0.58 0 0)" />
                <YAxis stroke="oklch(0.58 0 0)" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "oklch(0.12 0 0)",
                    border: "1px solid oklch(0.18 0 0)",
                    borderRadius: "8px",
                    color: "oklch(0.98 0 0)",
                  }}
                />
                <Bar dataKey="orders" fill="oklch(0.6 0.2 200)" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <Card className="border-border bg-card">
          <CardHeader>
            <CardTitle className="text-card-foreground">Top Products</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow className="border-border hover:bg-transparent">
                  <TableHead className="text-muted-foreground">
                    Product
                  </TableHead>
                  <TableHead className="text-muted-foreground">Sales</TableHead>
                  <TableHead className="text-muted-foreground">
                    Revenue
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {topProducts.map((product, index) => (
                  <TableRow
                    key={index}
                    className="border-border hover:bg-secondary/50"
                  >
                    <TableCell className="font-medium text-foreground">
                      {product.name}
                    </TableCell>
                    <TableCell className="text-muted-foreground">
                      {product.sales}
                    </TableCell>
                    <TableCell className="text-foreground">
                      ${product.revenue.toFixed(2)}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        <Card className="border-border bg-card">
          <CardHeader>
            <CardTitle className="text-card-foreground">
              Top Customers
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow className="border-border hover:bg-transparent">
                  <TableHead className="text-muted-foreground">
                    Customer
                  </TableHead>
                  <TableHead className="text-muted-foreground">
                    Orders
                  </TableHead>
                  <TableHead className="text-muted-foreground">
                    Total Spent
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {topCustomers.map((customer, index) => (
                  <TableRow
                    key={index}
                    className="border-border hover:bg-secondary/50"
                  >
                    <TableCell className="font-medium text-foreground">
                      {customer.name}
                    </TableCell>
                    <TableCell className="text-muted-foreground">
                      {customer.orders}
                    </TableCell>
                    <TableCell className="text-foreground">
                      ${customer.spent.toFixed(2)}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
