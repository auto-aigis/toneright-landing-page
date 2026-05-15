"use client";

import { useState, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  CheckCircle,
  Zap,
  Brain,
  Users,
  MessageSquare,
  TrendingUp,
  ChevronRight,
  BarChart3,
  Shield,
  Lightbulb,
} from "lucide-react";

interface PricingPlan {
  name: string;
  price: number;
  description: string;
  features: string[];
  cta: string;
  highlighted: boolean;
}

interface Feature {
  icon: React.ReactNode;
  title: string;
  description: string;
}

interface HowItWorksStep {
  number: number;
  title: string;
  description: string;
}

const pricingPlans: PricingPlan[] = [
  {
    name: "Starter",
    price: 9,
    description: "Perfect for individuals getting started",
    features: [
      "50 rewrites per month",
      "Basic tone analysis",
      "Email support",
      "Mobile app access",
    ],
    cta: "Start Free Trial",
    highlighted: false,
  },
  {
    name: "Professional",
    price: 29,
    description: "Best for professionals and teams",
    features: [
      "500 rewrites per month",
      "Advanced tone & cultural insights",
      "Priority support",
      "Team collaboration (up to 5 users)",
      "Learning analytics dashboard",
      "API access",
    ],
    cta: "Start Free Trial",
    highlighted: true,
  },
  {
    name: "Enterprise",
    price: 99,
    description: "For large organizations",
    features: [
      "Unlimited rewrites",
      "Custom integration",
      "Dedicated account manager",
      "Team analytics & reporting",
      "Custom tone profiles",
      "White-label options",
    ],
    cta: "Contact Sales",
    highlighted: false,
  },
];

const features: Feature[] = [
  {
    icon: <Brain className="h-6 w-6 text-blue-600" />,
    title: "Tone Intelligence",
    description:
      "AI analyzes emotional weight, formality levels, and cultural undertones in every sentence",
  },
  {
    icon: <Zap className="h-6 w-6 text-blue-600" />,
    title: "Instant Rewrites",
    description:
      "Get professional alternatives in seconds with confidence scores and explanations",
  },
  {
    icon: <Lightbulb className="h-6 w-6 text-blue-600" />,
    title: "Why It Matters",
    description:
      "Learn exactly why certain phrases sound passive-aggressive or too formal in English",
  },
  {
    icon: <TrendingUp className="h-6 w-6 text-blue-600" />,
    title: "Learn & Improve",
    description:
      "Track your tone progress over time and internalize natural English expression patterns",
  },
  {
    icon: <Shield className="h-6 w-6 text-blue-600" />,
    title: "Privacy First",
    description:
      "Your messages stay private. We never store your content without explicit consent",
  },
  {
    icon: <BarChart3 className="h-6 w-6 text-blue-600" />,
    title: "Performance Analytics",
    description:
      "See which tone issues appear most in your writing and track improvements",
  },
];

const howItWorks: HowItWorksStep[] = [
  {
    number: 1,
    title: "Paste Your Message",
    description:
      "Copy any email, Slack message, or professional text into ToneRight",
  },
  {
    number: 2,
    title: "Get Instant Analysis",
    description:
      "Our AI analyzes tone, formality, emotional weight, and cultural nuances",
  },
  {
    number: 3,
    title: "Understand Why",
    description:
      "Read clear explanations of why phrases might not land right with English speakers",
  },
  {
    number: 4,
    title: "Apply & Learn",
    description:
      "Use the rewrite or customize it further. Over time, internalize better communication patterns",
  },
];

interface FormData {
  email: string;
}

export default function ToneRightLanding(): React.ReactElement {
  const [email, setEmail] = useState<string>("");
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);

  const handleEmailSubmit = useCallback(
    (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      if (email.trim()) {
        setIsSubmitted(true);
        setEmail("");
        setTimeout(() => setIsSubmitted(false), 3000);
      }
    },
    [email]
  );

  const handleEmailChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setEmail(e.target.value);
    },
    []
  );

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <MessageSquare className="h-8 w-8 text-blue-600" />
            <span className="text-2xl font-bold text-gray-900">ToneRight</span>
          </div>
          <div className="hidden md:flex gap-8">
            <a href="#features" className="text-gray-600 hover:text-gray-900">
              Features
            </a>
            <a href="#how" className="text-gray-600 hover:text-gray-900">
              How It Works
            </a>
            <a href="#pricing" className="text-gray-600 hover:text-gray-900">
              Pricing
            </a>
          </div>
          <Button className="bg-blue-600 hover:bg-blue-700">
            Sign In
          </Button>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-32">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <Badge className="mb-4 bg-blue-100 text-blue-700 hover:bg-blue-100">
              AI-Powered Tone Coaching
            </Badge>
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
              Sound Like a Native English Professional
            </h1>
            <p className="text-xl text-gray-600 mb-8">
              ToneRight helps non-native English speakers master professional
              communication. Paste any email or message, get instant rewrites
              with tone analysis, cultural insights, and learn exactly why
              certain phrases matter.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button className="bg-blue-600 hover:bg-blue-700 text-white text-lg py-6 px-8">
                Start Free Trial
                <ChevronRight className="ml-2 h-5 w-5" />
              </Button>
              <Button
                variant="outline"
                className="text-gray-700 border-gray-300 text-lg py-6 px-8"
              >
                Watch Demo
              </Button>
            </div>
            <p className="text-sm text-gray-500 mt-6">
              ✓ No credit card required • ✓ Free 7-day trial • ✓ 100% private
            </p>
          </div>
          <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg p-8 h-96 flex items-center justify-center">
            <div className="text-center">
              <MessageSquare className="h-24 w-24 text-blue-600 mx-auto mb-4 opacity-50" />
              <p className="text-gray-600 text-lg">
                Your messages analyzed in real-time
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Social Proof */}
      <section className="bg-gray-50 py-12 border-y border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-center text-gray-600 mb-8 font-semibold">
            Trusted by professionals from 45+ countries
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <p className="text-3xl font-bold text-gray-900">2.5K+</p>
              <p className="text-gray-600">Active Users</p>
            </div>
            <div>
              <p className="text-3xl font-bold text-gray-900">50K+</p>
              <p className="text-gray-600">Messages Improved</p>
            </div>
            <div>
              <p className="text-3xl font-bold text-gray-900">4.8/5</p>
              <p className="text-gray-600">Average Rating</p>
            </div>
            <div>
              <p className="text-3xl font-bold text-gray-900">92%</p>
              <p className="text-gray-600">Confidence Boost</p>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 md:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <Badge className="mb-4 bg-blue-100 text-blue-700 hover:bg-blue-100">
              Features
            </Badge>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Everything You Need to Master Professional English
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Go beyond grammar fixes. Understand tone, learn cultural nuances,
              and build confidence in every professional interaction.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card
                key={index}
                className="p-8 hover:shadow-lg transition-shadow border-gray-200"
              >
                <div className="mb-4">{feature.icon}</div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  {feature.title}
                </h3>
                <p className="text-gray-600">{feature.description}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how" className="bg-gray-50 py-20 md:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <Badge className="mb-4 bg-blue-100 text-blue-700 hover:bg-blue-100">
              How It Works
            </Badge>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Simple. Smart. Instant.
            </h2>
          </div>
          <div className="grid md:grid-cols-4 gap-8">
            {howItWorks.map((step) => (
              <div key={step.number} className="relative">
                <div className="flex items-center justify-center h-14 w-14 rounded-full bg-blue-600 text-white font-bold text-lg mb-4">
                  {step.number}
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  {step.title}
                </h3>
                <p className="text-gray-600">{step.description}</p>
                {step.number < 4 && (
                  <div className="hidden md:block absolute top-7 -right-4 text-gray-300">
                    <ChevronRight className="h-6 w-6" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-20 md:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <Badge className="mb-4 bg-blue-100 text-blue-700 hover:bg-blue-100">
              Pricing
            </Badge>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Plans for Every Professional
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Start free. Upgrade anytime. Cancel anytime.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {pricingPlans.map((plan, index) => (
              <Card
                key={index}
                className={`p-8 transition-all ${
                  plan.highlighted
                    ? "border-2 border-blue-600 shadow-xl relative"
                    : "border border-gray-200"
                }`}
              >
                {plan.highlighted && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <Badge className="bg-blue-600 text-white">
                      Most Popular
                    </Badge>
                  </div>
                )}
                <h3 className="text-2xl font-bold text-gray-900 mb-2">
                  {plan.name}
                </h3>
                <p className="text-gray-600 mb-6">{plan.description}</p>
                <div className="mb-6">
                  <span className="text-4xl font-bold text-gray-900">
                    ${plan.price}
                  </span>
                  <span className="text-gray-600">/month</span>
                </div>
                <Button
                  className={`w-full mb-8 py-6 ${
                    plan.highlighted
                      ? "bg-blue-600 hover:bg-blue-700"
                      : "bg-gray-100 hover:bg-gray-200 text-gray-900"
                  }`}
                >
                  {plan.cta}
                </Button>
                <div className="space-y-4">
                  {plan.features.map((feature, featureIndex) => (
                    <div key={featureIndex} className="flex items-start gap-3">
                      <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-700">{feature}</span>
                    </div>
                  ))}
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="bg-gray-50 py-20 md:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-16 text-center">
            What Users Say
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                name: "Maria Chen",
                role: "Product Manager, Berlin",
                quote:
                  "Finally, a tool that explains WHY my email sounds off. ToneRight helped me understand American professional communication patterns I never picked up from textbooks.",
              },
              {
                name: "Rajesh Patel",
                role: "Software Engineer, Toronto",
                quote:
                  "Grammarly never told me why my messages felt passive-aggressive. ToneRight shows me the cultural context I was missing. Game-changer for my career.",
              },
              {
                name: "Sofia Rossi",
                role: "Freelance Consultant, London",
                quote:
                  "I use ToneRight before every client email now. My confidence skyrocketed, and my clients respond more positively. Worth every penny.",
              },
            ].map((testimonial, index) => (
              <Card key={index} className="p-8 border-gray-200">
                <div className="flex items-center gap-2 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <span key={i} className="text-yellow-400">
                      ★
                    </span>
                  ))}
                </div>
                <p className="text-gray-700 mb-6 italic">
                  "{testimonial.quote}"
                </p>
                <div>
                  <p className="font-bold text-gray-900">{testimonial.name}</p>
                  <p className="text-sm text-gray-600">{testimonial.role}</p>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 md:py-32">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-16 text-center">
            Frequently Asked Questions
          </h2>
          <Tabs defaultValue="tab1" className="w-full">
            <TabsList className="grid w-full grid-cols-2 md:grid-cols-3 mb-8">
              <TabsTrigger value="tab1">General</TabsTrigger>
              <TabsTrigger value="tab2">Privacy</TabsTrigger>
              <TabsTrigger value="tab3">Billing</TabsTrigger>
            </TabsList>
            <TabsContent value="tab1" className="space-y-6">
              {[
                {
                  q: "How does ToneRight differ from Grammarly?",
                  a: "Grammarly focuses on grammar and spelling. ToneRight focuses on tone, professional communication patterns, and cultural nuances specific to English-speaking business contexts.",
                },
                {
                  q: "Will this help me learn, or just rewrite for me?",
                  a: "Both. ToneRight rewrites immediately but also explains WHY certain phrases matter. Over time, you learn and internalize better communication patterns through our feedback loops.",
                },
              ].map((item, index) => (
                <Card key={index} className="p-6 border-gray-200">
                  <h3 className="font-bold text-gray-900 mb-2">{item.q}</h3>
                  <p className="text-gray-600">{item.a}</p>
                </Card>
              ))}
            </TabsContent>
            <TabsContent value="tab2" className="space-y-6">
              {[
                {
                  q: "Do you store my messages?",
                  a: "No. We process and analyze your messages in real-time but never store them without explicit opt-in for learning purposes.",
                },
                {
                  q: "Is my data encrypted?",
                  a: "Yes. All communications are encrypted end-to-end. Your privacy is our top priority.",
                },
              ].map((item, index) => (
                <Card key={index} className="p-6 border-gray-200">
                  <h3 className="font-bold text-gray-900 mb-2">{item.q}</h3>
                  <p className="text-gray-600">{item.a}</p>
                </Card>
              ))}
            </TabsContent>
            <TabsContent value="tab3" className="space-y-6">
              {[
                {
                  q: "Can I cancel anytime?",
                  a: "Yes. No long-term contracts. Cancel your subscription anytime from your account settings.",
                },
                {
                  q: "Do you offer refunds?",
                  a: "Yes. Full refund within 30 days if you are not satisfied. We are confident you will love ToneRight.",
                },
              ].map((item, index) => (
                <Card key={index} className="p-6 border-gray-200">
                  <h3 className="font-bold text-gray-900 mb-2">{item.q}</h3>
                  <p className="text-gray-600">{item.a}</p>
                </Card>
              ))}
            </TabsContent>
          </Tabs>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-20 md:py-32">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Stop Worrying About Your Tone
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            Join thousands of non-native English speakers who now communicate
            with confidence.
          </p>
          <form
            onSubmit={handleEmailSubmit}
            className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto mb-6"
          >
            <Input
              type="email"
              placeholder="your@email.com"
              value={email}
              onChange={handleEmailChange}
              required
              className="bg-white text-gray-900 py-6 px-4 rounded-lg flex-1"
            />
            <Button
              type="submit"
              className="bg-white text-blue-600 hover:bg-blue-50 py-6 px-8 font-semibold"
            >
              Start Free
            </Button>
          </form>
          {isSubmitted && (
            <p className="text-blue-100">
              Check your email for your trial link!
            </p>
          )}
          <p className="text-blue-100 text-sm">
            No credit card required. 7-day free trial. Cancel anytime.
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-400 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <MessageSquare className="h-6 w-6 text-blue-400" />
                <span className="font-bold text-white">ToneRight</span>
              </div>
              <p className="text-sm">
                AI writing coach for non-native English speakers.
              </p>
            </div>
            <div>
              <h4 className="font-bold text-white mb-4">Product</h4>
              <ul className="space-y-2 text-sm">
                <li>
                  <a href="#features" className="hover:text-white">
                    Features
                  </a>
                </li>
                <li>
                  <a href="#pricing" className="hover:text-white">
                    Pricing
                  </a>
                </li>
                <li>
                  <a href="#how" className="hover:text-white">
                    How It Works
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-white mb-4">Company</h4>
              <ul className="space-y-2 text-sm">
                <li>
                  <a href="/" className="hover:text-white">
                    About
                  </a>
                </li>
                <li>
                  <a href="/" className="hover:text-white">
                    Blog
                  </a>
                </li>
                <li>
                  <a href="/" className="hover:text-white">
                    Contact
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-white mb-4">Legal</h4>
              <ul className="space-y-2 text-sm">
                <li>
                  <a href="/" className="hover:text-white">
                    Privacy Policy
                  </a>
                </li>
                <li>
                  <a href="/" className="hover:text-white">
                    Terms of Service
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 pt-8 text-center text-sm">
            <p>
              &copy; 2024 ToneRight. All rights reserved. Made for non-native
              speakers.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}