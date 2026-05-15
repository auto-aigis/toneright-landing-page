"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Check } from "lucide-react";
import { billingApi } from "@/_lib/api";
import { useAuth } from "../_components/AuthProvider";
import { useRouter } from "next/navigation";

const tiers = [
  {
    id: "free",
    name: "Free",
    description: "Get started",
    monthlyPrice: 0,
    yearlyPrice: 0,
    features: [
      "5 rewrites per day",
      "Tone assessment only",
      "No cultural explanations",
      "No confidence scores",
      "Community support",
      "Last 10 analyses",
    ],
    cta: "Current Plan",
    ctaDisabled: true,
  },
  {
    id: "pro",
    name: "Pro",
    description: "For professionals",
    monthlyPrice: 8,
    yearlyPrice: 60,
    features: [
      "Unlimited rewrites per day",
      "Full tone assessment",
      "Cultural explanations in your language",
      "Confidence scores",
      "Email support",
      "Last 30 analyses",
    ],
    cta: "Upgrade to Pro",
    ctaDisabled: false,
    popular: true,
  },
  {
    id: "plus",
    name: "Plus",
    description: "For teams",
    monthlyPrice: 19,
    yearlyPrice: 140,
    features: [
      "Everything in Pro",
      "Priority support",
      "Early access to new tone models",
      "Sales, HR, Engineering tone models",
      "Up to 3 team seat invites",
      "Advanced analytics",
    ],
    cta: "Upgrade to Plus",
    ctaDisabled: false,
  },
];

export default function PricingPage() {
  const [billingPeriod, setBillingPeriod] = useState<"month" | "year">("month");
  const [loading, setLoading] = useState<string | null>(null);
  const { user } = useAuth();
  const router = useRouter();

  const handleUpgrade = async (tierId: string) => {
    if (!user) {
      router.push("/toneright/login");
      return;
    }

    if (tierId === "free") return;

    setLoading(tierId);
    try {
      const data = await billingApi.createCheckout(
        tierId,
        billingPeriod
      );
      window.location.href = data.checkout_url;
    } catch (err) {
      console.error(err);
      setLoading(null);
    }
  };

  const currentTier = user?.plan_tier || "free";

  return (
    <div className="mx-auto max-w-6xl space-y-8">
      <div className="space-y-2 text-center">
        <h1 className="text-3xl font-bold text-slate-900">Simple, transparent pricing</h1>
        <p className="text-lg text-slate-600">
          Choose the plan that fits your needs
        </p>
      </div>

      <div className="flex justify-center items-center gap-4">
        <button
          onClick={() => setBillingPeriod("month")}
          className={`px-6 py-2 rounded-lg font-medium transition-all ${
            billingPeriod === "month"
              ? "bg-blue-600 text-white"
              : "bg-slate-100 text-slate-900 hover:bg-slate-200"
          }`}
        >
          Monthly
        </button>
        <button
          onClick={() => setBillingPeriod("year")}
          className={`px-6 py-2 rounded-lg font-medium transition-all ${
            billingPeriod === "year"
              ? "bg-blue-600 text-white"
              : "bg-slate-100 text-slate-900 hover:bg-slate-200"
          }`}
        >
          Annual
          <Badge variant="secondary" className="ml-2">Save 20%</Badge>
        </button>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        {tiers.map((tier) => (
          <Card
            key={tier.id}
            className={`relative flex flex-col transition-all ${
              tier.popular
                ? "border-blue-600 shadow-lg md:scale-105"
                : ""
            } ${currentTier === tier.id ? "border-green-600" : ""}`}
          >
            {tier.popular && (
              <Badge className="absolute -top-3 left-1/2 -translate-x-1/2 bg-blue-600">
                Most Popular
              </Badge>
            )}
            {currentTier === tier.id && (
              <Badge className="absolute -top-3 right-4 bg-green-600">
                Current
              </Badge>
            )}

            <CardHeader>
              <CardTitle>{tier.name}</CardTitle>
              <CardDescription>{tier.description}</CardDescription>
              <div className="mt-4">
                <div className="text-3xl font-bold text-slate-900">
                  {billingPeriod === "month"
                    ? `$${tier.monthlyPrice}`
                    : `$${tier.yearlyPrice}`}
                </div>
                <p className="text-sm text-slate-600">
                  {tier.monthlyPrice === 0
                    ? "Forever free"
                    : billingPeriod === "month"
                      ? "/month"
                      : "/year"}
                </p>
              </div>
            </CardHeader>

            <CardContent className="flex-1 space-y-4">
              <Button
                onClick={() => handleUpgrade(tier.id)}
                disabled={tier.ctaDisabled || loading === tier.id}
                variant={tier.popular ? "default" : "outline"}
                className="w-full"
              >
                {loading === tier.id
                  ? "Processing..."
                  : currentTier === tier.id
                    ? "Current Plan"
                    : tier.cta}
              </Button>

              <div className="space-y-3">
                {tier.features.map((feature, idx) => (
                  <div key={idx} className="flex gap-3 items-start">
                    <Check className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                    <span className="text-sm text-slate-700">{feature}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card className="bg-blue-50 border-blue-200">
        <CardContent className="pt-6">
          <h3 className="font-semibold text-slate-900 mb-2">Have questions?</h3>
          <p className="text-sm text-slate-700 mb-4">
            Contact our support team at support@toneright.com or chat with us live.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
