"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { ArrowRight } from "lucide-react";
import { analyzeApi } from "@/_lib/api";

interface Analysis {
  id: string;
  original_text: string;
  tone_label: string;
  confidence_score?: number;
  created_at: string;
}

export default function DashboardPage() {
  const [analyses, setAnalyses] = useState<Analysis[]>([]);
  const [loading, setLoading] = useState(true);
  const [usage, setUsage] = useState<{ today: number; limit: number } | null>(
    null
  );

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [analysesData, usageData] = await Promise.all([
        analyzeApi.getAnalyses(),
        analyzeApi.getUsageToday(),
      ]);
      setAnalyses(analysesData);
      setUsage(usageData);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const truncateText = (text: string, length = 100) => {
    return text.length > length ? text.substring(0, length) + "..." : text;
  };

  return (
    <div className="mx-auto max-w-4xl space-y-6">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold text-slate-900">Your History</h1>
        <p className="text-slate-600">
          Review all your recent tone analyses
        </p>
      </div>

      {usage && (
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Today's Usage</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div>
                <div className="text-2xl font-bold text-slate-900">
                  {usage.today}
                </div>
                <div className="text-sm text-slate-600">
                  of {usage.limit} rewrites used today
                </div>
              </div>
              <div className="h-12 w-12 rounded-full bg-blue-100 flex items-center justify-center">
                <div className="text-lg font-semibold text-blue-600">
                  {Math.round((usage.today / usage.limit) * 100)}%
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      <div className="space-y-3">
        {loading ? (
          <>
            {[1, 2, 3].map((i) => (
              <Card key={i}>
                <CardContent className="pt-6">
                  <Skeleton className="h-4 w-3/4 mb-2" />
                  <Skeleton className="h-3 w-1/2" />
                </CardContent>
              </Card>
            ))}
          </>
        ) : analyses.length === 0 ? (
          <Card>
            <CardContent className="pt-6 text-center">
              <p className="text-slate-600 mb-4">
                No analyses yet. Start by analyzing your first message!
              </p>
              <Link href="/toneright">
                <Button>Analyze My Tone</Button>
              </Link>
            </CardContent>
          </Card>
        ) : (
          analyses.map((analysis) => (
            <Link key={analysis.id} href={`/toneright/analysis/${analysis.id}`}>
              <Card className="cursor-pointer hover:shadow-md transition-shadow">
                <CardContent className="pt-6">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-2">
                        <Badge variant="outline">{analysis.tone_label}</Badge>
                        {analysis.confidence_score !== undefined && (
                          <span className="text-xs text-slate-500">
                            {analysis.confidence_score}% confidence
                          </span>
                        )}
                      </div>
                      <p className="text-sm text-slate-700 mb-1 line-clamp-2">
                        {truncateText(analysis.original_text, 150)}
                      </p>
                      <p className="text-xs text-slate-500">
                        {formatDate(analysis.created_at)}
                      </p>
                    </div>
                    <ArrowRight className="h-5 w-5 text-slate-400 flex-shrink-0" />
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))
        )}
      </div>

      {!loading && analyses.length > 0 && (
        <div className="text-center">
          <Link href="/toneright">
            <Button variant="outline">
              Analyze Another Message
            </Button>
          </Link>
        </div>
      )}
    </div>
  );
}
