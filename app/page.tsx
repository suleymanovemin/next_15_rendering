"use client";

import React from "react";
import { Code, Zap, Server, RefreshCw, Layers } from "lucide-react";

const renderStrategies = [
    {
      name: 'CSR',
      icon: <Code className="w-6 h-6 text-orange-600" />,
      color: 'bg-orange-100',
      description: 'Client-Side Rendering – HTML kabuğu serverdən gəlir, data brauzerdə fetch olunur və komponentlər hydration sonrası interaktiv olur.',
      seo: 'Məhdud',
      performance: 'İlkin yükləmə daha yavaş, interaktivlik sürətli',
      useCase: 'Dashboard, Admin, Auth tələb edən səhifələr'
    },
    {
      name: 'SSR',
      icon: <Server className="w-6 h-6 text-blue-600" />,
      color: 'bg-blue-100',
      description: 'Server-Side Rendering – Hər sorğuda serverdən tam HTML render olunur, brauzer qəbul edəndə artıq məzmun hazırdır.',
      seo: 'Mükəmməl',
      performance: 'Daimi təzə data, TTFB arta bilər',
      useCase: 'Profillər, real-vaxt yaxın kontent, fərdiləşmiş səhifələr'
    },
    {
      name: 'SSG',
      icon: <Zap className="w-6 h-6 text-green-600" />,
      color: 'bg-green-100',
      description: 'Static Site Generation – Səhifələr build zamanı öncədən yaradılır və CDN-dən statik fayl kimi verilir.',
      seo: 'Mükəmməl',
      performance: 'Çox sürətli (TTFB/FCP əla)',
      useCase: 'Bloq, sənədləşdirmə, dəyişməyən marketinq səhifələri'
    },
    {
      name: 'ISR',
      icon: <RefreshCw className="w-6 h-6 text-purple-600" />,
      color: 'bg-purple-100',
      description: 'Incremental Static Regeneration – SSG səhifələri arxa planda təyin etdiyiniz intervalda yenilənir.',
      seo: 'Mükəmməl',
      performance: 'Çox sürətli (CDN), data periodik yenilənir',
      useCase: 'E-ticarət kataloqu, xəbərlər, dinamik bloq'
    },
    {
      name: 'PPR',
      icon: <Layers className="w-6 h-6 text-cyan-600" />,
      color: 'bg-cyan-100',
      description: 'Partial Prerendering – Səhifənin statik «kabuğu» əvvəlcədən verilir, məzmunun dinamik hissələri Suspense ilə hissə-hissə yüklənir.',
      seo: 'Mükəmməl',
      performance: 'Hibrid: ilkin görüntü dərhal, dinamik hissə sonradan',
      useCase: 'Kompleks landinqlər, qarışıq statik+dinamik səhifələr'
    }
  ];

  export default function Page() {
    return (
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12 mt-10">
          <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Next.js Render Strategiyaları
          </h1>
          <p className="text-xl text-gray-600">
            Müxtəlif render strategiyalarını kəşf edin və tətbiqiniz üçün ən uyğun olanı seçin
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6 mb-12">
          {renderStrategies.map((strategy, index) => (
            <div key={index} className="bg-white border-2 border-gray-200 rounded-xl p-6 hover:border-blue-500 transition-all hover:shadow-lg">
              <div className="flex items-center gap-3 mb-3">
                <div className={`p-3 rounded-lg ${strategy.color}`}>
                  {strategy.icon}
                </div>
                <h3 className="text-xl font-bold">{strategy.name}</h3>
              </div>
              <p className="text-gray-600 mb-4">{strategy.description}</p>
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-sm">
                  <span className="font-semibold">SEO:</span>
                  <span className={strategy.seo === 'Mükəmməl' ? 'text-green-600' : strategy.seo === 'Məhdud' ? 'text-yellow-600' : 'text-red-600'}>
                    {strategy.seo}
                  </span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <span className="font-semibold">Performans:</span>
                  <span className={strategy.performance.includes('Çox') || strategy.performance.includes('çox') ? 'text-green-600' : strategy.performance.includes('sürətli') ? 'text-blue-600' : 'text-yellow-600'}>
                    {strategy.performance}
                  </span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <span className="font-semibold">İstifadə:</span>
                  <span className="text-gray-700">{strategy.useCase}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-8">
          <h2 className="text-2xl font-bold mb-4">Hansı Strategiyanı Seçməli?</h2>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="bg-white rounded-lg p-4">
              <h3 className="font-semibold mb-2">✅ SEO Vacibdirsə</h3>
              <p className="text-sm text-gray-600">SSR, SSG, ISR və ya PPR istifadə edin</p>
            </div>
            <div className="bg-white rounded-lg p-4">
              <h3 className="font-semibold mb-2">⚡ Performans Kritikdirsə</h3>
              <p className="text-sm text-gray-600">SSG və ya ISR üstünlük verin</p>
            </div>
            <div className="bg-white rounded-lg p-4">
              <h3 className="font-semibold mb-2">🔄 Real-vaxt Məlumat</h3>
              <p className="text-sm text-gray-600">SSR və ya CSR istifadə edin</p>
            </div>
            <div className="bg-white rounded-lg p-4">
              <h3 className="font-semibold mb-2">💰 Aşağı Xərc</h3>
              <p className="text-sm text-gray-600">SSG və ya CSR seçin</p>
            </div>
          </div>
        </div>
      </div>
    );
  }