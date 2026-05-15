import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-slate-100">
      <header className="sticky top-0 z-40 border-b border-slate-200 bg-white/80 backdrop-blur">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <div className="text-2xl font-bold text-blue-600">ToneRight</div>
          <div className="flex items-center gap-4">
            <Link href="/toneright/login">
              <Button variant="ghost">Sign In</Button>
            </Link>
            <Link href="/toneright/register">
              <Button>Analyze My Tone</Button>
            </Link>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-24">
        <section className="text-center space-y-6 mb-24">
          <h1 className="text-5xl md:text-6xl font-bold text-slate-900 leading-tight">
            Sound exactly <br className="hidden sm:block" /> how you mean to
          </h1>
          <p className="text-xl md:text-2xl text-slate-600 max-w-2xl mx-auto">
            Professional tone analysis for non-native English speakers. Paste any email, message, or document and get instant AI-powered rewrites with cultural context.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
            <Link href="/toneright/register">
              <Button size="lg" className="w-full sm:w-auto">
                Get Started Free
              </Button>
            </Link>
            <Link href="/toneright/pricing">
              <Button size="lg" variant="outline" className="w-full sm:w-auto">
                View Pricing
              </Button>
            </Link>
          </div>
        </section>

        <section className="grid md:grid-cols-3 gap-8 mb-24">
          <div className="space-y-3">
            <div className="text-4xl">✨</div>
            <h3 className="text-xl font-semibold text-slate-900">Instant Analysis</h3>
            <p className="text-slate-600">
              Paste any professional message and instantly receive tone assessment with confidence scores.
            </p>
          </div>
          <div className="space-y-3">
            <div className="text-4xl">🌍</div>
            <h3 className="text-xl font-semibold text-slate-900">Cultural Context</h3>
            <p className="text-slate-600">
              Get explanations in your native language (Hindi, Spanish, or Portuguese) on why your phrasing might carry tone risk.
            </p>
          </div>
          <div className="space-y-3">
            <div className="text-4xl">💡</div>
            <h3 className="text-xl font-semibold text-slate-900">Smart Rewrites</h3>
            <p className="text-slate-600">
              Choose from 2-3 rewritten alternatives with different tone profiles (Assertive, Collaborative, Concise).
            </p>
          </div>
        </section>

        <section className="bg-white rounded-2xl border border-slate-200 p-12 text-center space-y-6 mb-24">
          <h2 className="text-3xl font-bold text-slate-900">
            Built for confidence, not perfection
          </h2>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            ToneRight helps non-native English professionals communicate with confidence. We're not a grammar checker — we're your tone coach, explaining the cultural nuances of professional English.
          </p>
          <Link href="/toneright/register">
            <Button size="lg">Analyze My Tone</Button>
          </Link>
        </section>

        <section className="space-y-8">
          <h2 className="text-3xl font-bold text-slate-900 text-center mb-12">
            Pricing Plans
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="rounded-lg border border-slate-200 p-8 space-y-6">
              <div>
                <h3 className="text-xl font-semibold text-slate-900">Free</h3>
                <p className="text-sm text-slate-600">Get started</p>
              </div>
              <div className="text-3xl font-bold">$0</div>
              <ul className="space-y-3 text-sm text-slate-600">
                <li>✓ 5 rewrites/day</li>
                <li>✓ Tone assessment</li>
                <li>• No cultural explanations</li>
                <li>• Community support</li>
              </ul>
              <Link href="/toneright/register">
                <Button variant="outline" className="w-full">Get Started</Button>
              </Link>
            </div>

            <div className="rounded-lg border-2 border-blue-600 p-8 space-y-6 bg-blue-50 transform md:scale-105 md:-my-4">
              <div>
                <h3 className="text-xl font-semibold text-slate-900">Pro</h3>
                <p className="text-sm text-slate-600">Most popular</p>
              </div>
              <div>
                <span className="text-3xl font-bold">$8</span>
                <span className="text-slate-600">/month</span>
              </div>
              <ul className="space-y-3 text-sm text-slate-600">
                <li>✓ Unlimited rewrites/day</li>
                <li>✓ Cultural explanations</li>
                <li>✓ Confidence scores</li>
                <li>✓ Tone history (30 days)</li>
              </ul>
              <Link href="/toneright/register">
                <Button className="w-full">Upgrade to Pro</Button>
              </Link>
            </div>

            <div className="rounded-lg border border-slate-200 p-8 space-y-6">
              <div>
                <h3 className="text-xl font-semibold text-slate-900">Plus</h3>
                <p className="text-sm text-slate-600">For teams</p>
              </div>
              <div>
                <span className="text-3xl font-bold">$19</span>
                <span className="text-slate-600">/month</span>
              </div>
              <ul className="space-y-3 text-sm text-slate-600">
                <li>✓ Everything in Pro</li>
                <li>✓ Priority support</li>
                <li>✓ Early access to new models</li>
                <li>✓ Up to 3 team seats</li>
              </ul>
              <Link href="/toneright/register">
                <Button variant="outline" className="w-full">Upgrade to Plus</Button>
              </Link>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-slate-200 bg-white mt-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center text-sm text-slate-600">
            <p>© 2024 ToneRight. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
