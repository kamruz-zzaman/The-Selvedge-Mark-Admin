"use client";

import type React from "react";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ArrowLeft, Save } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { customersApi } from "@/lib/api/customers";
import { useToast } from "@/hooks/use-toast";

export default function NewCustomerPage() {
  const router = useRouter();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    company: "",
    address: "",
    city: "",
    state: "",
    zip: "",
    country: "United States",
    notes: "",
    tags: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Prepare customer data
      const customerData = {
        name: `${formData.firstName} ${formData.lastName}`.trim(),
        email: formData.email,
        phone: formData.phone,
        address: formData.address,
        city: formData.city,
        state: formData.state,
        postalCode: formData.zip,
        country: formData.country,
      };

      await customersApi.create(customerData);

      toast({
        title: "Success",
        description: "Customer created successfully",
      });

      router.push("/admin/customers");
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.response?.data?.error || "Failed to create customer",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link href="/admin/customers">
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
              Add Customer
            </h1>
            <p className="text-muted-foreground">
              Create a new customer profile
            </p>
          </div>
        </div>
        <Button
          onClick={handleSubmit}
          disabled={loading}
          className="bg-primary text-primary-foreground hover:bg-primary/90"
        >
          <Save className="mr-2 h-4 w-4" />
          {loading ? "Saving..." : "Save Customer"}
        </Button>
      </div>

      <form onSubmit={handleSubmit} className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2 space-y-6">
          <Card className="border-border bg-card">
            <CardHeader>
              <CardTitle className="text-card-foreground">
                Customer Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="firstName" className="text-foreground">
                    First Name
                  </Label>
                  <Input
                    id="firstName"
                    value={formData.firstName}
                    onChange={(e) =>
                      setFormData({ ...formData, firstName: e.target.value })
                    }
                    className="bg-secondary text-foreground"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lastName" className="text-foreground">
                    Last Name
                  </Label>
                  <Input
                    id="lastName"
                    value={formData.lastName}
                    onChange={(e) =>
                      setFormData({ ...formData, lastName: e.target.value })
                    }
                    className="bg-secondary text-foreground"
                    required
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-foreground">
                    Email
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                    className="bg-secondary text-foreground"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone" className="text-foreground">
                    Phone
                  </Label>
                  <Input
                    id="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={(e) =>
                      setFormData({ ...formData, phone: e.target.value })
                    }
                    className="bg-secondary text-foreground"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="company" className="text-foreground">
                  Company (Optional)
                </Label>
                <Input
                  id="company"
                  value={formData.company}
                  onChange={(e) =>
                    setFormData({ ...formData, company: e.target.value })
                  }
                  className="bg-secondary text-foreground"
                />
              </div>
            </CardContent>
          </Card>

          <Card className="border-border bg-card">
            <CardHeader>
              <CardTitle className="text-card-foreground">Address</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="address" className="text-foreground">
                  Street Address
                </Label>
                <Input
                  id="address"
                  value={formData.address}
                  onChange={(e) =>
                    setFormData({ ...formData, address: e.target.value })
                  }
                  className="bg-secondary text-foreground"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="city" className="text-foreground">
                    City
                  </Label>
                  <Input
                    id="city"
                    value={formData.city}
                    onChange={(e) =>
                      setFormData({ ...formData, city: e.target.value })
                    }
                    className="bg-secondary text-foreground"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="state" className="text-foreground">
                    State
                  </Label>
                  <Input
                    id="state"
                    value={formData.state}
                    onChange={(e) =>
                      setFormData({ ...formData, state: e.target.value })
                    }
                    className="bg-secondary text-foreground"
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="zip" className="text-foreground">
                    ZIP Code
                  </Label>
                  <Input
                    id="zip"
                    value={formData.zip}
                    onChange={(e) =>
                      setFormData({ ...formData, zip: e.target.value })
                    }
                    className="bg-secondary text-foreground"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="country" className="text-foreground">
                    Country
                  </Label>
                  <Select
                    value={formData.country}
                    onValueChange={(value) =>
                      setFormData({ ...formData, country: value })
                    }
                  >
                    <SelectTrigger className="bg-secondary text-foreground">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-popover text-popover-foreground">
                      <SelectItem value="United States">
                        United States
                      </SelectItem>
                      <SelectItem value="Canada">Canada</SelectItem>
                      <SelectItem value="United Kingdom">
                        United Kingdom
                      </SelectItem>
                      <SelectItem value="Australia">Australia</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          <Card className="border-border bg-card">
            <CardHeader>
              <CardTitle className="text-card-foreground">Tags</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <Label htmlFor="tags" className="text-foreground">
                  Customer Tags
                </Label>
                <Input
                  id="tags"
                  value={formData.tags}
                  onChange={(e) =>
                    setFormData({ ...formData, tags: e.target.value })
                  }
                  placeholder="VIP, wholesale, etc."
                  className="bg-secondary text-foreground"
                />
                <p className="text-xs text-muted-foreground">
                  Comma separated tags
                </p>
              </div>
            </CardContent>
          </Card>

          <Card className="border-border bg-card">
            <CardHeader>
              <CardTitle className="text-card-foreground">Notes</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <Label htmlFor="notes" className="text-foreground">
                  Internal Notes
                </Label>
                <Textarea
                  id="notes"
                  value={formData.notes}
                  onChange={(e) =>
                    setFormData({ ...formData, notes: e.target.value })
                  }
                  rows={6}
                  placeholder="Add notes about this customer..."
                  className="bg-secondary text-foreground"
                />
              </div>
            </CardContent>
          </Card>
        </div>
      </form>
    </div>
  );
}
