"use client";

import { useEffect, useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
// import { Separator } from "@/components/ui/separator";
import { Copy, CheckCircle2, AlertTriangle } from "lucide-react";
import { analyzeApi, billingApi } from "@/_lib/api";
import { useAuth } from "./_components/AuthProvider";

interface Analysis {
  id: string;
  tone_label: string;
  confidence_score?: number;
  cultural_explanation?: string;
  rewrites?: Array<{
    profile: string;
    text: string;
    diff_tokens: Array<{ type: string; text: string }>;
  }>;
}

function MainContent() {
  const searchParams = useSearchParams();
  const { user } = useAuth();
  const [text, setText] = useState("");
  const [analysis, setAnalysis] = useState<Analysis | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [usage, setUsage] = useState<{ today: number; limit: number } | null>(null);
  const [copied, setCopied] = useState<string | null>(null);
  const [showUpgradeModal, setShowUpgradeModal] = useState(false);
  const [processPayment, setProcessPayment] = useState(false);

  const isCheckout = searchParams?.get("checkout") === "success";
  const transactionId = searchParams?.get("transaction_id");

  useEffect(() => {
    fetchUsage();
    if (isCheckout && transactionId) {
      verifyAndProcessPayment();
    }
  }, [isCheckout, transactionId]);

  const verifyAndProcessPayment = async () => {
    setProcessPayment(true);
    try {
      await billingApi.verifyTransaction(transactionId!);
      setProcessPayment(false);
      window.history.replaceState({}, "", "/toneright");
      await fetchUsage();
    } catch {
      setProcessPayment(false);
      pollForSubscription();
    }
  };

  const pollForSubscription = async () => {
    for (let i = 0; i < 20; i++) {
      await new Promise((r) => setTimeout(r, 2000));
      try {
        await fetchUsage();
        return;
      } catch {
        continue;
      }
    }
  };

  const fetchUsage = async () => {
    try {
      const data = await analyzeApi.getUsageToday();
      setUsage(data);
    } catch {
      setUsage(null);
    }
  };

  const handleAnalyze = async () => {
    if (!text.trim()) {
      setError("Please paste some text to analyze");
      return;
    }

    if (text.length > 2000) {
      setError("Text must be 2000 characters or less");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const result = await analyzeApi.analyze(text, "standard");
      setAnalysis(result);
      await fetchUsage();
      setShowUpgradeModal(false);
    } catch (err: any) {
      if (err.status === 429) {
        setShowUpgradeModal(true);
        setAnalysis(null);
      } else {
        setError(err instanceof Error ? err.message : "Analysis failed");
      }
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopied(id);
    setTimeout(() => setCopied(null), 2000);
  };

  const charCount = text.length;

  return (
    <div className="mx-auto max-w-4xl space-y-6">
      {processPayment && (
        <Alert className="border-blue-200 bg-blue-50">
          <AlertTriangle className="h-4 w-4 text-blue-600" />
          <AlertDescription className="text-blue-800">
            Payment processing... please wait
          </AlertDescription>
        </Alert>
      )}

      {isCheckout && !processPayment && (
        <Alert className="border-green-200 bg-green-50">
          <CheckCircle2 className="h-4 w-4 text-green-600" />
          <AlertDescription className="text-green-800">
            Welcome to {user?.plan_tier === "plus" ? "ToneRight Plus" : "ToneRight Pro"}! Enjoy unlimited rewrites and full cultural explanations.
          </AlertDescription>
        </Alert>
      )}

      <div className="space-y-2">
        <h1 className="text-3xl font-bold text-slate-900">Analyze Your Tone</h1>
        <p className="text-slate-600">
          Paste any professional message and get instant tone feedback with rewrite suggestions
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Your Message</CardTitle>
          <CardDescription>
            Paste an email, Slack message, review, or any professional text
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {error && (
            <Alert variant="destructive">
              <AlertTriangle className="h-4 w-4" />
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          <div className="space-y-2">
            <div className="flex justify-between">
              <label className="text-sm font-medium text-slate-700">Message</label>
              <span className="text-sm text-slate-500">
                {charCount}/2000 characters
              </span>
            </div>
            <Textarea
              placeholder="Paste your professional message here..."
              value={text}
              onChange={(e) => setText(e.target.value)}
              className="min-h-32 resize-none"
            />
          </div>

          <div className="flex items-center justify-between">
            <div className="text-sm text-slate-600">
              Daily usage: {usage?.today || 0}/{usage?.limit || 5}
            </div>
            <Button
              onClick={handleAnalyze}
              disabled={loading}
              size="lg"
              className="min-w-40"
            >
              {loading ? "Analyzing..." : "Analyze My Tone"}
            </Button>
          </div>
        </CardContent>
      </Card>

      {analysis && (
        <div className="space-y-4">
          <Card>
            <CardHeader>
              <div className="flex items-start justify-between">
                <div>
                  <CardTitle>Tone Assessment</CardTitle>
                  <CardDescription>
                    Here's how your message comes across
                  </CardDescription>
                </div>
                <Badge
                  variant={
                    analysis.tone_label?.includes("Formal") ||
                    analysis.tone_label?.includes("Assertive")
                      ? "default"
                      : analysis.tone_label?.includes("Collaborative") ||
                          analysis.tone_label?.includes("Clear")
                        ? "default"
                        : "secondary"
                  }
                  className="text-base"
                >
                  {analysis.tone_label}
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-2">
              {analysis.confidence_score !== undefined && (
                <div>
                  <div className="text-sm font-medium text-slate-700">
                    Confidence Score
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="h-2 flex-1 rounded-full bg-slate-200">
                      <div
                        className="h-2 rounded-full bg-blue-600 transition-all"
                        style={{ width: `${analysis.confidence_score}%` }}
                      />
                    </div>
                    <span className="text-sm font-semibold text-slate-700">
                      {analysis.confidence_score}%
                    </span>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {analysis.cultural_explanation && (
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Cultural Context</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-slate-700 leading-relaxed">
                  {analysis.cultural_explanation}
                </p>
              </CardContent>
            </Card>
          )}

          {analysis.rewrites && analysis.rewrites.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle>Rewrite Suggestions</CardTitle>
                <CardDescription>
                  Try these alternatives to shift the tone of your message
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {analysis.rewrites.map((rewrite, idx) => (
                  <div key={idx} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <Badge variant="outline">{rewrite.profile}</Badge>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() =>
                          copyToClipboard(
                            rewrite.text,
                            `rewrite-${idx}`
                          )
                        }
                      >
                        {copied === `rewrite-${idx}` ? (
                          <>
                            <CheckCircle2 className="mr-1 h-4 w-4" />
                            Copied!
                          </>
                        ) : (
                          <>
                            <Copy className="mr-1 h-4 w-4" />
                            Copy
                          </>
                        )}
                      </Button>
                    </div>
                    <div className="rounded-lg bg-slate-50 p-3 text-sm text-slate-700">
                      {rewrite.text}
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          )}
        </div>
      )}

      {showUpgradeModal && (
        <Card className="border-blue-200 bg-blue-50">
          <CardHeader>
            <CardTitle>Daily Limit Reached</CardTitle>
            <CardDescription>
              You've used all 5 rewrites today. Upgrade to get unlimited rewrites.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button onClick={() => window.location.href = "/toneright/pricing"}>
              View Plans
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
}

export default function Page() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <MainContent />
    </Suspense>
  );
}
