"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Plus, Edit, Trash2 } from "lucide-react"

const shippingZones = [
  {
    id: "1",
    name: "United States",
    regions: "All states",
    methods: 3,
  },
  {
    id: "2",
    name: "Canada",
    regions: "All provinces",
    methods: 2,
  },
  {
    id: "3",
    name: "Europe",
    regions: "EU countries",
    methods: 2,
  },
]

const shippingMethods = [
  {
    id: "1",
    name: "Standard Shipping",
    zone: "United States",
    rate: "$5.99",
    estimatedDays: "5-7 days",
    enabled: true,
  },
  {
    id: "2",
    name: "Express Shipping",
    zone: "United States",
    rate: "$15.99",
    estimatedDays: "2-3 days",
    enabled: true,
  },
  {
    id: "3",
    name: "Overnight",
    zone: "United States",
    rate: "$29.99",
    estimatedDays: "1 day",
    enabled: false,
  },
]

export default function ShippingPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-semibold text-foreground">Shipping</h1>
          <p className="text-muted-foreground">Manage shipping zones and rates</p>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <Card className="border-border bg-card">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-card-foreground">Shipping Zones</CardTitle>
              <Button size="sm" className="bg-primary text-primary-foreground hover:bg-primary/90">
                <Plus className="mr-2 h-4 w-4" />
                Add Zone
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow className="border-border hover:bg-transparent">
                  <TableHead className="text-muted-foreground">Zone</TableHead>
                  <TableHead className="text-muted-foreground">Regions</TableHead>
                  <TableHead className="text-muted-foreground">Methods</TableHead>
                  <TableHead className="text-muted-foreground"></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {shippingZones.map((zone) => (
                  <TableRow key={zone.id} className="border-border hover:bg-secondary/50">
                    <TableCell className="font-medium text-foreground">{zone.name}</TableCell>
                    <TableCell className="text-muted-foreground">{zone.regions}</TableCell>
                    <TableCell className="text-muted-foreground">{zone.methods}</TableCell>
                    <TableCell>
                      <div className="flex gap-2">
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 text-muted-foreground hover:text-foreground"
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon" className="h-8 w-8 text-destructive hover:text-destructive">
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        <Card className="border-border bg-card">
          <CardHeader>
            <CardTitle className="text-card-foreground">Shipping Settings</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label className="text-foreground">Free Shipping Threshold</Label>
                <p className="text-sm text-muted-foreground">Offer free shipping above this amount</p>
              </div>
              <Switch />
            </div>
            <div className="space-y-2">
              <Label htmlFor="threshold" className="text-foreground">
                Minimum Order Amount
              </Label>
              <Input id="threshold" type="number" placeholder="100.00" className="bg-secondary text-foreground" />
            </div>
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label className="text-foreground">Real-time Rates</Label>
                <p className="text-sm text-muted-foreground">Calculate shipping from carriers</p>
              </div>
              <Switch />
            </div>
            <div className="space-y-2">
              <Label htmlFor="carrier" className="text-foreground">
                Default Carrier
              </Label>
              <Select>
                <SelectTrigger className="bg-secondary text-foreground">
                  <SelectValue placeholder="Select carrier" />
                </SelectTrigger>
                <SelectContent className="bg-popover text-popover-foreground">
                  <SelectItem value="usps">USPS</SelectItem>
                  <SelectItem value="ups">UPS</SelectItem>
                  <SelectItem value="fedex">FedEx</SelectItem>
                  <SelectItem value="dhl">DHL</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <Button className="w-full bg-primary text-primary-foreground hover:bg-primary/90">Save Settings</Button>
          </CardContent>
        </Card>
      </div>

      <Card className="border-border bg-card">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-card-foreground">Shipping Methods</CardTitle>
            <Button size="sm" className="bg-primary text-primary-foreground hover:bg-primary/90">
              <Plus className="mr-2 h-4 w-4" />
              Add Method
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow className="border-border hover:bg-transparent">
                <TableHead className="text-muted-foreground">Method</TableHead>
                <TableHead className="text-muted-foreground">Zone</TableHead>
                <TableHead className="text-muted-foreground">Rate</TableHead>
                <TableHead className="text-muted-foreground">Delivery Time</TableHead>
                <TableHead className="text-muted-foreground">Status</TableHead>
                <TableHead className="text-muted-foreground"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {shippingMethods.map((method) => (
                <TableRow key={method.id} className="border-border hover:bg-secondary/50">
                  <TableCell className="font-medium text-foreground">{method.name}</TableCell>
                  <TableCell className="text-muted-foreground">{method.zone}</TableCell>
                  <TableCell className="text-foreground">{method.rate}</TableCell>
                  <TableCell className="text-muted-foreground">{method.estimatedDays}</TableCell>
                  <TableCell>
                    <Switch checked={method.enabled} />
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 text-muted-foreground hover:text-foreground"
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon" className="h-8 w-8 text-destructive hover:text-destructive">
                        <Trash2 className="h-4 w-4" />
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
