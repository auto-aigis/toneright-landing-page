"use client";

import React, { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { useAuth } from "./AuthProvider";
import { Button } from "@/components/ui/button";
import { Menu, X, LogOut, BarChart3, Settings, DollarSign } from "lucide-react";

export function AppShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const { user, loading, logout } = useAuth();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const isAuthPage =
    pathname?.endsWith("/login") ||
    pathname?.endsWith("/register") ||
    pathname?.endsWith("/verify-email");

  useEffect(() => {
    setSidebarOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!loading && !user && !isAuthPage) {
      router.push("/toneright/login");
    }
  }, [loading, user, isAuthPage, router]);

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center bg-gradient-to-br from-slate-50 to-slate-100">
        <div className="text-center">
          <div className="mb-4 text-2xl font-semibold text-slate-900">
            ToneRight
          </div>
          <div className="h-2 w-24 animate-pulse rounded-full bg-blue-500 mx-auto"></div>
        </div>
      </div>
    );
  }

  if (isAuthPage) {
    return <>{children}</>;
  }

  if (!user) {
    return null;
  }

  const navItems = [
    { href: "/toneright", label: "Analyze", icon: BarChart3 },
    { href: "/toneright/dashboard", label: "History", icon: BarChart3 },
    { href: "/toneright/pricing", label: "Upgrade", icon: DollarSign },
    { href: "/toneright/settings", label: "Settings", icon: Settings },
  ];

  const handleLogout = async () => {
    await logout();
    router.push("/toneright/login");
  };

  return (
    <div className="flex min-h-screen bg-slate-50">
      <div
        className="fixed inset-0 z-40 bg-black/50 transition-opacity md:hidden"
        style={{ opacity: sidebarOpen ? 1 : 0, pointerEvents: sidebarOpen ? "auto" : "none" }}
        onClick={() => setSidebarOpen(false)}
      />

      <aside
        className={`fixed left-0 top-0 z-50 h-screen w-64 transform bg-slate-950 border-r border-slate-800 transition-transform duration-200 md:sticky md:translate-x-0 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex h-full flex-col p-6">
          <div className="mb-8">
            <h1 className="text-xl font-bold text-white">ToneRight</h1>
            <p className="text-sm text-slate-400">Professional tone, instantly.</p>
          </div>

          <nav className="flex-1 space-y-2">
            {navItems.map(({ href, label, icon: Icon }) => {
              const isActive = pathname === href;
              return (
                <button
                  key={href}
                  onClick={() => {
                    router.push(href);
                    setSidebarOpen(false);
                  }}
                  className={`flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
                    isActive
                      ? "bg-slate-800 text-white"
                      : "text-slate-300 hover:bg-slate-800/60"
                  }`}
                >
                  <Icon className="h-4 w-4" />
                  {label}
                </button>
              );
            })}
          </nav>

          <button
            onClick={handleLogout}
            className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium text-slate-300 hover:bg-slate-800/60 transition-colors"
          >
            <LogOut className="h-4 w-4" />
            Logout
          </button>
        </div>
      </aside>

      <div className="flex flex-1 flex-col">
        <div className="sticky top-0 z-30 border-b border-slate-200 bg-white md:hidden">
          <div className="flex h-14 items-center justify-between px-4">
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="text-slate-600 hover:text-slate-900"
            >
              {sidebarOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
            <h1 className="text-sm font-semibold text-slate-900">ToneRight</h1>
            <div className="w-5"></div>
          </div>
        </div>

        <main className="flex-1 overflow-auto md:ml-0">
          <div className="p-6 md:p-8">{children}</div>
        </main>
      </div>
    </div>
  );
}
