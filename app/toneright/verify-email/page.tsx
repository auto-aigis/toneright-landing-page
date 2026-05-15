"use client";

import { useEffect, useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { CheckCircle, AlertCircle, Loader2 } from "lucide-react";
import { authApi } from "@/_lib/api";

function VerifyEmailContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams?.get("token");
  const email = searchParams?.get("email");

  const [status, setStatus] = useState<"loading" | "success" | "error" | "waiting">(
    token ? "loading" : "waiting"
  );
  const [resendSent, setResendSent] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (token) {
      verifyToken();
    }
  }, [token]);

  const verifyToken = async () => {
    try {
      await authApi.verifyEmail(token!);
      setStatus("success");
      setTimeout(() => {
        router.push("/toneright/onboarding");
      }, 2000);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Verification failed");
      setStatus("error");
    }
  };

  const handleResendVerification = async () => {
    if (!email) return;
    setResendSent(false);
    try {
      await authApi.resendVerification(email);
      setResendSent(true);
      setTimeout(() => setResendSent(false), 3000);
    } catch (err) {
      setError("Failed to resend verification email");
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-slate-50 to-slate-100 p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold">Verify your email</CardTitle>
          <CardDescription>
            We're setting up your ToneRight account
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {status === "loading" && (
            <div className="flex flex-col items-center gap-4">
              <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
              <p className="text-center text-sm text-slate-600">
                Verifying your email...
              </p>
            </div>
          )}

          {status === "success" && (
            <div className="flex flex-col items-center gap-4">
              <CheckCircle className="h-8 w-8 text-green-600" />
              <p className="text-center text-sm font-medium text-green-700">
                Email verified! Redirecting...
              </p>
            </div>
          )}

          {status === "error" && (
            <div className="space-y-4">
              <Alert variant="destructive">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>{error}</AlertDescription>
              </Alert>
              {email && (
                <Button
                  onClick={handleResendVerification}
                  variant="outline"
                  className="w-full"
                >
                  Resend Verification Email
                </Button>
              )}
              <Link href="/toneright/login">
                <Button variant="ghost" className="w-full">
                  Back to Sign In
                </Button>
              </Link>
            </div>
          )}

          {status === "waiting" && email && (
            <div className="space-y-4">
              <Alert>
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>
                  Check your inbox — we sent a verification link to {email}
                </AlertDescription>
              </Alert>

              {resendSent && (
                <Alert className="border-green-200 bg-green-50">
                  <CheckCircle className="h-4 w-4 text-green-600" />
                  <AlertDescription className="text-green-800">
                    Verification email sent!
                  </AlertDescription>
                </Alert>
              )}

              <Button
                onClick={handleResendVerification}
                variant="outline"
                className="w-full"
              >
                Resend Verification Email
              </Button>

              <Link href="/toneright/login">
                <Button variant="ghost" className="w-full">
                  Back to Sign In
                </Button>
              </Link>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

export default function VerifyEmailPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <VerifyEmailContent />
    </Suspense>
  );
}
