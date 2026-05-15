const API_URL = process.env.NEXT_PUBLIC_API_URL || "";

export async function apiFetch<T>(path: string, options?: RequestInit): Promise<T> {
  const res = await fetch(`${API_URL}${path}`, {
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
      ...options?.headers,
    },
    ...options,
  });

  if (!res.ok) {
    const error = await res.json().catch(() => ({}));
    const message = error.detail || `API error: ${res.status}`;
    const err = new Error(message);
    (err as any).status = res.status;
    throw err;
  }

  return res.json();
}

export const authApi = {
  register: (email: string, password: string, display_name: string) =>
    apiFetch<{ status: string; email: string }>("/api/auth/register", {
      method: "POST",
      body: JSON.stringify({ email, password, display_name }),
    }),

  login: (email: string, password: string) =>
    apiFetch<{
      id: string;
      email: string;
      display_name: string;
      native_language: string | null;
      onboarding_complete: boolean;
      plan_tier: string;
      daily_usage: number;
    }>("/api/auth/login", {
      method: "POST",
      body: JSON.stringify({ email, password }),
    }),

  me: () =>
    apiFetch<{
      id: string;
      email: string;
      display_name: string;
      native_language: string | null;
      onboarding_complete: boolean;
      plan_tier: string;
      daily_usage: number;
    }>("/api/auth/me"),

  logout: () =>
    apiFetch<{ status: string }>("/api/auth/logout", { method: "POST" }),

  verifyEmail: (token: string) =>
    apiFetch<{ status: string }>(`/api/auth/verify-email?token=${token}`, {
      method: "POST",
    }),

  resendVerification: (email: string) =>
    apiFetch<{ status: string }>("/api/auth/resend-verification", {
      method: "POST",
      body: JSON.stringify({ email }),
    }),

  completeOnboarding: (native_language: string) =>
    apiFetch<{ status: string }>("/api/auth/onboarding", {
      method: "PATCH",
      body: JSON.stringify({ native_language }),
    }),

  getSubscription: () =>
    apiFetch<{
      plan_tier: string;
      status: string;
      paddle_subscription_id: string;
      current_period_end: string;
      team_seats: number;
    }>("/api/auth/subscription"),

  googleAuth: () =>
    apiFetch<{ auth_url: string }>("/api/auth/google"),

  googleCallback: (id_token: string) =>
    apiFetch<{
      id: string;
      email: string;
      display_name: string;
      native_language: string | null;
      onboarding_complete: boolean;
      plan_tier: string;
      daily_usage: number;
    }>("/api/auth/google/callback", {
      method: "POST",
      body: JSON.stringify({ id_token }),
    }),
};

export const analyzeApi = {
  analyze: (text: string, tone_model: string = "standard") =>
    apiFetch<{
      id: string;
      tone_label: string;
      confidence_score?: number;
      cultural_explanation?: string;
      rewrites?: Array<{
        profile: string;
        text: string;
        diff_tokens: Array<{ type: string; text: string }>;
      }>;
    }>("/api/analyze", {
      method: "POST",
      body: JSON.stringify({ text, tone_model }),
    }),

  getAnalyses: () =>
    apiFetch<
      Array<{
        id: string;
        original_text: string;
        tone_label: string;
        confidence_score?: number;
        created_at: string;
      }>
    >("/api/analyses"),

  getAnalysis: (analysis_id: string) =>
    apiFetch<{
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
    }>(`/api/analyses/${analysis_id}`),

  getUsageToday: () =>
    apiFetch<{
      today: number;
      limit: number;
      pro_unlimited: boolean;
    }>("/api/usage/today"),
};

export const billingApi = {
  createCheckout: (tier: string, billing_period: string) =>
    apiFetch<{ checkout_url: string }>("/api/billing/checkout", {
      method: "POST",
      body: JSON.stringify({ tier, billing_period }),
    }),

  getPortal: () =>
    apiFetch<{ portal_url: string }>("/api/billing/portal", {
      method: "POST",
    }),

  verifyTransaction: (transaction_id: string) =>
    apiFetch<{ status: string }>("/api/paddle/verify-transaction", {
      method: "POST",
      body: JSON.stringify({ transaction_id }),
    }),
};

export const settingsApi = {
  getSettings: () =>
    apiFetch<{
      native_language: string;
      openai_api_key_masked: string;
    }>("/api/settings"),

  updateSettings: (native_language?: string, openai_api_key?: string) =>
    apiFetch<{ status: string }>("/api/settings", {
      method: "PATCH",
      body: JSON.stringify({
        ...(native_language && { native_language }),
        ...(openai_api_key && { openai_api_key }),
      }),
    }),
};
