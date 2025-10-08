"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useState } from "react";
import { Menu, X, Code, Zap, Server, RefreshCw, Layers, Home } from "lucide-react";

const navigationItems = [
  { id: "home", href: "/", label: "Ana Səhifə", icon: <Home className="w-5 h-5" /> },
  { id: "csr", href: "/csr", label: "CSR", icon: <Code className="w-5 h-5" /> },
  { id: "ssr", href: "/ssr", label: "SSR", icon: <Server className="w-5 h-5" /> },
  { id: "ssg", href: "/ssg", label: "SSG", icon: <Zap className="w-5 h-5" /> },
  { id: "isr", href: "/isr", label: "ISR", icon: <RefreshCw className="w-5 h-5" /> },
  { id: "ppr", href: "/ppr", label: "PPR", icon: <Layers className="w-5 h-5" /> },
];

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-xl">N</span>
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-900">Next.js Render</h1>
              <p className="text-xs text-gray-500">Strategiyalar Demo</p>
            </div>
          </div>

          <nav className="hidden md:flex items-center gap-2">
            {navigationItems.map((item) => (
              <Link
                key={item.id}
                href={item.href}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all ${
                  pathname === item.href
                    ? "bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg"
                    : "text-gray-700 hover:bg-gray-100"
                }`}
              >
                {item.icon}
                <span>{item.label}</span>
              </Link>
            ))}
          </nav>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-lg hover:bg-gray-100"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {mobileMenuOpen && (
          <div className="md:hidden py-4 border-t">
            <nav className="flex flex-col gap-2">
              {navigationItems.map((item) => (
                <Link
                  key={item.id}
                  href={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`flex items-center gap-3 px-4 py-3 rounded-lg font-medium transition-all ${
                    pathname === item.href ? "bg-gradient-to-r from-blue-500 to-purple-600 text-white" : "text-gray-700 hover:bg-gray-100"
                  }`}
                >
                  {item.icon}
                  <span>{item.label}</span>
                </Link>
              ))}
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}
