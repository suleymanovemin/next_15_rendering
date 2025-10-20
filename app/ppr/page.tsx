import { Suspense } from "react";

// Statik hissə - build zamanı render edilir
function StaticContent() {
  return (
    <div className="p-6 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg border border-blue-200">
      <div className="flex items-center gap-3 mb-3">
        <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
          <span className="text-white font-bold text-sm">S</span>
        </div>
        <h2 className="text-xl font-bold text-blue-800">Statik Məzmun</h2>
      </div>
      <p className="text-gray-700 mb-3">
        Bu hissə build zamanı yaradıldı və anında göstərilir. İstifadəçi səhifəni açan kimi 
        bu məzmunu görür.
      </p>
      <div className="bg-white p-3 rounded border">
        <p className="text-sm text-gray-600">
          <strong>Faydaları:</strong> Dərhal görünür, SEO üçün mükəmməl, server yükü yoxdur
        </p>
      </div>
    </div>
  );
}

// Dinamik hissə - istifadəçi sorğusunda render edilir
async function DynamicContent() {
  // Simulasiya edilmiş gecikmə (real API çağrısı)
  await new Promise((resolve) => setTimeout(resolve, 2000));

  try {
    const res = await fetch("https://jsonplaceholder.typicode.com/posts/1", {
      cache: "no-store", // Hər dəfə təzə məlumat
    });
    
    if (!res.ok) {
      throw new Error(`API xətası: ${res.status}`);
    }
    
    const post = await res.json();

    return (
      <div className="p-6 bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg border border-green-200">
        <div className="flex items-center gap-3 mb-3">
          <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
            <span className="text-white font-bold text-sm">D</span>
          </div>
          <h2 className="text-xl font-bold text-green-800">Dinamik Məzmun</h2>
        </div>
        <div className="bg-white p-4 rounded border mb-3">
          <h3 className="font-semibold text-lg mb-2">{post.title}</h3>
          <p className="text-sm text-gray-600">{post.body}</p>
        </div>
        <div className="bg-green-100 p-3 rounded">
          <p className="text-xs text-green-700">
            <strong>Yüklənmə vaxtı:</strong> {new Date().toLocaleTimeString("az-Latn-AZ")}
          </p>
          <p className="text-xs text-green-600 mt-1">
            Bu məzmun istifadəçi səhifəni açan zaman yüklənir
          </p>
        </div>
      </div>
    );
  } catch (error) {
    return (
      <div className="p-6 bg-red-50 rounded-lg border border-red-200">
        <h2 className="text-xl font-bold text-red-800 mb-3">Dinamik Məzmun Xətası</h2>
        <p className="text-red-600">
          Məlumatlar yüklənə bilmədi: {error instanceof Error ? error.message : 'Naməlum xəta'}
        </p>
      </div>
    );
  }
}

// Loading komponenti
function LoadingFallback() {
  return (
    <div className="p-6 bg-gray-50 rounded-lg border border-gray-200 animate-pulse">
      <div className="flex items-center gap-3 mb-3">
        <div className="w-8 h-8 bg-gray-300 rounded-full"></div>
        <div className="h-6 bg-gray-300 rounded w-32"></div>
      </div>
      <div className="space-y-2">
        <div className="h-4 bg-gray-300 rounded w-full"></div>
        <div className="h-4 bg-gray-300 rounded w-3/4"></div>
        <div className="h-4 bg-gray-300 rounded w-1/2"></div>
      </div>
      <div className="mt-4 text-sm text-gray-500">
        Dinamik məzmun yüklənir...
      </div>
    </div>
  );
}

export default function PPRPage() {
  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-6">PPR - Partial Prerendering</h1>
      
      {/* İzah bloku */}
      <div className="bg-cyan-50 border-l-4 border-cyan-500 p-6 mb-8 rounded-r-lg">
        <h2 className="text-xl font-semibold mb-3 text-cyan-800">Nədir?</h2>
        <p className="text-gray-700 mb-4">
          Partial Prerendering Next.js 15-də təqdim edilən yeni texnologiyadır. Səhifənin 
          statik hissələri əvvəlcədən render edilir və dərhal göstərilir, dinamik hissələr 
          isə Suspense ilə ayrı-ayrı yüklənir. Bu, ən yaxşı performans və istifadəçi təcrübəsini birləşdirir.
        </p>
        
        <div className="grid md:grid-cols-2 gap-4 mb-4">
          <div>
            <h3 className="font-semibold text-green-600 mb-2">✅ Üstünlüklər</h3>
            <ul className="text-sm text-gray-600 space-y-1">
              <li>• İlkin görünüş dərhal</li>
              <li>• Dinamik məzmun lazım olduqda</li>
              <li>• Mükəmməl SEO</li>
              <li>• Hibrid performans</li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold text-red-600 mb-2">❌ Çatışmazlıqlar</h3>
            <ul className="text-sm text-gray-600 space-y-1">
              <li>• Mürəkkəb implementasiya</li>
              <li>• Suspense tələb olunur</li>
              <li>• Yeni texnologiya</li>
              <li>• Debugging çətin</li>
            </ul>
          </div>
        </div>

        <div className="bg-white p-4 rounded border">
          <h3 className="font-semibold mb-2">🔧 Necə işləyir?</h3>
          <ol className="text-sm text-gray-600 space-y-1">
            <li>1. Build zamanı statik qabıq yaradılır</li>
            <li>2. İstifadəçi səhifəni açır - statik hissə dərhal görünür</li>
            <li>3. Dinamik hissələr Suspense ilə paralel yüklənir</li>
            <li>4. Hər dinamik hissə hazır olduqda görünür</li>
            <li>5. İstifadəçi təcrübəsi davamlı olur</li>
          </ol>
        </div>

        <div className="bg-yellow-50 p-4 rounded border mt-4">
          <h3 className="font-semibold mb-2">⚡ Next.js 15 Xüsusiyyətləri</h3>
          <p className="text-sm text-gray-600">
            PPR Next.js 15-də eksperimental olaraq mövcuddur. <code className="bg-gray-200 px-1 rounded">Suspense</code> 
            komponentləri dinamik &quot;adalar&quot; yaradır və statik qabıqla birləşir.
          </p>
        </div>
      </div>

      {/* Demo hissəsi */}
      <div className="bg-gray-50 p-6 rounded-lg">
        <h2 className="text-xl font-semibold mb-4">Demo: Hibrid Render Strategiyası</h2>
        <p className="text-sm text-gray-600 mb-6">
          Aşağıda PPR-nin necə işlədiyini görə bilərsiniz. Mavi hissə dərhal görünür, 
          yaşıl hissə isə 2 saniyə sonra yüklənir:
        </p>

        <div className="space-y-6">
          {/* Statik hissə - dərhal görünür */}
          <StaticContent />

          {/* Dinamik hissə - Suspense ilə yüklənir */}
          <Suspense fallback={<LoadingFallback />}>
            <DynamicContent />
          </Suspense>
        </div>

        <div className="mt-6 bg-blue-100 p-4 rounded border">
          <h3 className="font-semibold text-blue-800 mb-2">💡 Müşahidə</h3>
          <p className="text-sm text-blue-700">
            Səhifəni yeniləyərək statik hissənin dərhal, dinamik hissənin isə gecikmə ilə 
            göründüyünü müşahidə edin. Bu, PPR-nin əsas üstünlüyüdür.
          </p>
        </div>
      </div>
    </div>
  );
}
