"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Copy, CheckCircle2, ArrowLeft } from "lucide-react";
import { analyzeApi } from "@/_lib/api";

interface Analysis {
  id: string;
  original_text: string;
  tone_label: string;
  confidence_score?: number;
  cultural_explanation?: string;
  rewrites?: Array<{
    profile: string;
    text: string;
    diff_tokens: Array<{ type: string; text: string }>;
  }>;
  created_at: string;
}

export default function AnalysisPage() {
  const params = useParams();
  const analysisId = params?.id as string;
  const [analysis, setAnalysis] = useState<Analysis | null>(null);
  const [loading, setLoading] = useState(true);
  const [copied, setCopied] = useState<string | null>(null);

  useEffect(() => {
    if (analysisId) {
      fetchAnalysis();
    }
  }, [analysisId]);

  const fetchAnalysis = async () => {
    try {
      const data = await analyzeApi.getAnalysis(analysisId);
      setAnalysis(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopied(id);
    setTimeout(() => setCopied(null), 2000);
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  if (loading) {
    return (
      <div className="mx-auto max-w-4xl space-y-6">
        <div>
          <Link href="/toneright/dashboard">
            <Button variant="ghost" className="mb-4">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to History
            </Button>
          </Link>
        </div>
        <Card>
          <CardContent className="pt-6">
            <Skeleton className="h-4 w-1/3 mb-4" />
            <Skeleton className="h-20 w-full" />
          </CardContent>
        </Card>
      </div>
    );
  }

  if (!analysis) {
    return (
      <div className="mx-auto max-w-4xl space-y-6">
        <div>
          <Link href="/toneright/dashboard">
            <Button variant="ghost">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to History
            </Button>
          </Link>
        </div>
        <Card>
          <CardContent className="pt-6 text-center">
            <p className="text-slate-600">Analysis not found</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-4xl space-y-6">
      <div>
        <Link href="/toneright/dashboard">
          <Button variant="ghost">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to History
          </Button>
        </Link>
      </div>

      <div className="space-y-2">
        <h1 className="text-3xl font-bold text-slate-900">Analysis Details</h1>
        <p className="text-slate-600">
          {formatDate(analysis.created_at)}
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Original Message</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="whitespace-pre-wrap rounded-lg bg-slate-50 p-4 text-sm text-slate-700">
            {analysis.original_text}
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <div className="flex items-start justify-between">
            <div>
              <CardTitle>Tone Assessment</CardTitle>
              <CardDescription>
                How your message comes across
              </CardDescription>
            </div>
            <Badge
              variant="default"
              className="text-base"
            >
              {analysis.tone_label}
            </Badge>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          {analysis.confidence_score !== undefined && (
            <div>
              <div className="text-sm font-medium text-slate-700 mb-2">
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
            <CardTitle className="text-lg">Cultural Context</CardTitle>
            <CardDescription>
              Why this phrasing may carry tone risk
            </CardDescription>
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
              Try these alternatives to shift the tone
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {analysis.rewrites.map((rewrite, idx) => (
              <div key={idx} className="space-y-2">
                <div className="flex items-center justify-between">
                  <Badge variant="outline" className="text-base">
                    {rewrite.profile}
                  </Badge>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => copyToClipboard(rewrite.text, `rewrite-${idx}`)}
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
                <div className="rounded-lg bg-slate-50 p-4 text-sm text-slate-700 leading-relaxed">
                  {rewrite.text}
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      )}
    </div>
  );
}
