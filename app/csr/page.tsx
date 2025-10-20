"use client";
import { useState, useEffect } from "react";

type Post = {
  userId: number;
  id: number;
  title: string;
  body: string;
};

// Loading skeleton komponenti
function LoadingSkeleton() {
  return (
    <div className="space-y-2">
      {[...Array(5)].map((_, i) => (
        <div key={i} className="p-4 border rounded animate-pulse">
          <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
          <div className="h-3 bg-gray-200 rounded w-1/2"></div>
        </div>
      ))}
    </div>
  );
}

export default function CSRPage() {
  const [data, setData] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/posts")
      .then((res) => {
        if (!res.ok) throw new Error("Məlumatlar yüklənə bilmədi");
        return res.json();
      })
      .then((data) => {
        setData(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-6">CSR - Client Side Rendering</h1>
      
      {/* İzah bloku */}
      <div className="bg-blue-50 border-l-4 border-blue-500 p-6 mb-8 rounded-r-lg">
        <h2 className="text-xl font-semibold mb-3 text-blue-800">Nədir?</h2>
        <p className="text-gray-700 mb-4">
          Client-Side Rendering zamanı server yalnız boş HTML kabuğunu göndərir. 
          JavaScript yüklənib işə düşəndən sonra brauzer API-dən məlumatları çəkir və 
          komponentləri dinamik olaraq render edir.
        </p>
        
        <div className="grid md:grid-cols-2 gap-4 mb-4">
          <div>
            <h3 className="font-semibold text-green-600 mb-2">✅ Üstünlüklər</h3>
            <ul className="text-sm text-gray-600 space-y-1">
              <li>• Server yükü az</li>
              <li>• İnteraktivlik sürətli</li>
              <li>• CDN-dən statik fayllar</li>
              <li>• Real-vaxt məlumatlar</li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold text-red-600 mb-2">❌ Çatışmazlıqlar</h3>
            <ul className="text-sm text-gray-600 space-y-1">
              <li>• SEO məhdudiyyətləri</li>
              <li>• İlkin yükləmə yavaş</li>
              <li>• JavaScript tələb olunur</li>
              <li>• Boş səhifə ilk görünüş</li>
            </ul>
          </div>
        </div>

        <div className="bg-white p-4 rounded border">
          <h3 className="font-semibold mb-2">🔧 Necə işləyir?</h3>
          <ol className="text-sm text-gray-600 space-y-1">
            <li>1. Server boş HTML kabuğu göndərir</li>
            <li>2. JavaScript bundle yüklənir</li>
            <li>3. React hydration başlayır</li>
            <li>4. useEffect ilə API sorğusu</li>
            <li>5. Məlumatlar gəldikdə komponent yenilənir</li>
          </ol>
        </div>
      </div>

      {/* Demo hissəsi */}
      <div className="bg-gray-50 p-6 rounded-lg">
        <h2 className="text-xl font-semibold mb-4">Demo: Məqalələr siyahısı</h2>
        <p className="text-sm text-gray-600 mb-4">
          Aşağıdakı məlumatlar brauzerdə yüklənir (JSONPlaceholder API-dən):
        </p>
        
        {loading && <LoadingSkeleton />}
        
        {error && (
          <div className="bg-red-50 border border-red-200 rounded p-4">
            <p className="text-red-600 font-semibold">Xəta: {error}</p>
            <button 
              onClick={() => window.location.reload()} 
              className="mt-2 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
            >
              Yenidən cəhd et
            </button>
          </div>
        )}
        
        {!loading && !error && (
          <div className="space-y-2">
            {data?.slice(0, 5).map((post: Post) => (
              <div key={post.id} className="p-4 bg-white border rounded hover:shadow-md transition-shadow">
                <h3 className="font-semibold text-lg mb-2">{post.title}</h3>
                <p className="text-sm text-gray-600">{post.body}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
