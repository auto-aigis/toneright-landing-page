"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { CheckCircle2, AlertTriangle, Eye, EyeOff } from "lucide-react";
import { settingsApi } from "@/_lib/api";
import { useAuth } from "../_components/AuthProvider";

const languages = [
  { id: "hindi", label: "हिंदी (Hindi)" },
  { id: "spanish", label: "Español (Spanish)" },
  { id: "portuguese", label: "Português (Portuguese)" },
];

export default function SettingsPage() {
  const { user, refresh } = useAuth();
  const [nativeLanguage, setNativeLanguage] = useState("");
  const [apiKey, setApiKey] = useState("");
  const [maskedApiKey, setMaskedApiKey] = useState("");
  const [showApiKey, setShowApiKey] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);
  const [isReplacingKey, setIsReplacingKey] = useState(false);

  useEffect(() => {
    if (user) {
      setNativeLanguage(user.native_language || "");
      fetchSettings();
    }
  }, [user]);

  const fetchSettings = async () => {
    try {
      const settings = await settingsApi.getSettings();
      setMaskedApiKey(settings.openai_api_key_masked || "");
    } catch (err) {
      console.error(err);
    }
  };

  const handleSave = async () => {
    setLoading(true);
    setMessage(null);

    try {
      await settingsApi.updateSettings(
        nativeLanguage || undefined,
        apiKey || undefined
      );
      setMessage({ type: "success", text: "Settings saved successfully!" });
      setApiKey("");
      setIsReplacingKey(false);
      await refresh();
      await fetchSettings();
      setTimeout(() => setMessage(null), 3000);
    } catch (err) {
      setMessage({
        type: "error",
        text: err instanceof Error ? err.message : "Failed to save settings",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mx-auto max-w-2xl space-y-6">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold text-slate-900">Settings</h1>
        <p className="text-slate-600">
          Manage your account preferences and integrations
        </p>
      </div>

      {message && (
        <Alert variant={message.type === "error" ? "destructive" : "default"}>
          {message.type === "success" ? (
            <CheckCircle2 className="h-4 w-4" />
          ) : (
            <AlertTriangle className="h-4 w-4" />
          )}
          <AlertDescription>{message.text}</AlertDescription>
        </Alert>
      )}

      <Card>
        <CardHeader>
          <CardTitle>Native Language</CardTitle>
          <CardDescription>
            This language will be used for cultural explanations
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-3">
            {languages.map((lang) => (
              <label key={lang.id} className="flex items-center gap-3 cursor-pointer">
                <input
                  type="radio"
                  name="language"
                  value={lang.id}
                  checked={nativeLanguage === lang.id}
                  onChange={(e) => setNativeLanguage(e.target.value)}
                  className="h-4 w-4"
                />
                <span className="text-sm font-medium text-slate-700">{lang.label}</span>
              </label>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>OpenAI API Key</CardTitle>
          <CardDescription>
            Optional: Provide your own OpenAI API key to use your own credits
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {maskedApiKey && !isReplacingKey && (
            <div className="flex items-center justify-between rounded-lg bg-slate-50 p-3">
              <code className="text-sm text-slate-700">{maskedApiKey}</code>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setIsReplacingKey(true)}
              >
                Replace
              </Button>
            </div>
          )}

          {isReplacingKey && (
            <div className="space-y-2">
              <Label htmlFor="apiKey">API Key</Label>
              <div className="relative">
                <Input
                  id="apiKey"
                  type={showApiKey ? "text" : "password"}
                  placeholder="sk_live_..."
                  value={apiKey}
                  onChange={(e) => setApiKey(e.target.value)}
                />
                <button
                  onClick={() => setShowApiKey(!showApiKey)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-700"
                >
                  {showApiKey ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </button>
              </div>
              <p className="text-xs text-slate-500">
                Your API key will be encrypted and never shared
              </p>
            </div>
          )}

          {!maskedApiKey && !isReplacingKey && (
            <div>
              <p className="text-sm text-slate-600 mb-3">
                No API key configured. Using platform credits.
              </p>
              <Button
                variant="outline"
                onClick={() => setIsReplacingKey(true)}
              >
                Add API Key
              </Button>
            </div>
          )}
        </CardContent>
      </Card>

      <div className="flex gap-3">
        <Button
          onClick={handleSave}
          disabled={loading}
          size="lg"
        >
          {loading ? "Saving..." : "Save Changes"}
        </Button>
      </div>
    </div>
  );
}
