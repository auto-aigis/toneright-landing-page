"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";
import { authApi } from "@/_lib/api";

const languages = [
  { id: "hindi", label: "हिंदी (Hindi)", emoji: "🇮🇳" },
  { id: "spanish", label: "Español (Spanish)", emoji: "🇪🇸" },
  { id: "portuguese", label: "Português (Portuguese)", emoji: "🇧🇷" },
];

export default function OnboardingPage() {
  const router = useRouter();
  const [selected, setSelected] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async () => {
    if (!selected) return;
    setLoading(true);
    setError("");

    try {
      await authApi.completeOnboarding(selected);
      router.push("/toneright");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to save language");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-blue-50 via-slate-50 to-slate-100 p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold">Let's get started</CardTitle>
          <CardDescription>
            Select your native language so we can explain cultural nuances in
            your preferred language
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {error && (
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          <div className="space-y-3">
            {languages.map((lang) => (
              <button
                key={lang.id}
                onClick={() => setSelected(lang.id)}
                className={`flex w-full items-center gap-4 rounded-lg border-2 p-4 transition-all ${
                  selected === lang.id
                    ? "border-blue-600 bg-blue-50"
                    : "border-slate-200 hover:border-blue-400 hover:bg-slate-50"
                }`}
              >
                <div className="text-2xl">{lang.emoji}</div>
                <div className="flex-1 text-left">
                  <div className="font-semibold text-slate-900">{lang.label}</div>
                </div>
                <div
                  className={`h-5 w-5 rounded-full border-2 ${
                    selected === lang.id
                      ? "border-blue-600 bg-blue-600"
                      : "border-slate-300"
                  }`}
                />
              </button>
            ))}
          </div>

          <Button
            onClick={handleSubmit}
            disabled={!selected || loading}
            size="lg"
            className="w-full"
          >
            {loading ? "Setting up..." : "Continue to ToneRight"}
          </Button>

          <p className="text-center text-xs text-slate-500">
            You can change your language anytime in settings
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
