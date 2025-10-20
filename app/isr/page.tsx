async function getData() {
  try {
    const res = await fetch("https://jsonplaceholder.typicode.com/posts", {
      next: { revalidate: 60 }, // 60 saniyədə bir yenilənir
    });

    if (!res.ok) {
      throw new Error(`HTTP xətası: ${res.status}`);
    }
    
    return res.json();
  } catch (error) {
    console.error("ISR məlumat yükləmə xətası:", error);
    throw new Error("Məlumatlar yüklənə bilmədi");
  }
}

export const revalidate = 60; // Yenilənmə müddəti 60 saniyə

type Post = {
  userId: number;
  id: number;
  title: string;
  body: string;
};

export default async function ISRPage() {
  let posts: Post[] = [];
  let error: string | null = null;
  let renderTime: string;

  try {
    posts = await getData();
    renderTime = new Date().toLocaleString("az-Latn-AZ");
  } catch (err) {
    error = err instanceof Error ? err.message : "Naməlum xəta";
    renderTime = new Date().toLocaleString("az-Latn-AZ");
  }

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-6">ISR - Incremental Static Regeneration</h1>
      
      {/* İzah bloku */}
      <div className="bg-orange-50 border-l-4 border-orange-500 p-6 mb-8 rounded-r-lg">
        <h2 className="text-xl font-semibold mb-3 text-orange-800">Nədir?</h2>
        <p className="text-gray-700 mb-4">
          Incremental Static Regeneration SSG və SSR-in hibrididir. Səhifələr əvvəlcədən 
          yaradılır (SSG kimi), lakin müəyyən intervalda arxa planda yenilənir. İstifadəçilər 
          həmişə sürətli cavab alır, məlumatlar isə müntəzəm yenilənir.
        </p>
        
        <div className="grid md:grid-cols-2 gap-4 mb-4">
          <div>
            <h3 className="font-semibold text-green-600 mb-2">✅ Üstünlüklər</h3>
            <ul className="text-sm text-gray-600 space-y-1">
              <li>• SSG sürətli performansı</li>
              <li>• Avtomatik məlumat yenilənməsi</li>
              <li>• Mükəmməl SEO</li>
              <li>• Server yükü az</li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold text-red-600 mb-2">❌ Çatışmazlıqlar</h3>
            <ul className="text-sm text-gray-600 space-y-1">
              <li>• Məlumatlar intervalda köhnələ bilər</li>
              <li>• İlk yenilənmə gec ola bilər</li>
              <li>• Keş idarəetməsi mürəkkəbdir</li>
              <li>• Build prosesi uzun ola bilər</li>
            </ul>
          </div>
        </div>

        <div className="bg-white p-4 rounded border">
          <h3 className="font-semibold mb-2">🔧 Necə işləyir?</h3>
          <ol className="text-sm text-gray-600 space-y-1">
            <li>1. İlk build zamanı statik səhifələr yaradılır</li>
            <li>2. İstifadəçi səhifəni istəyir - statik versiya verilir</li>
            <li>3. Revalidate müddəti bitəndə arxa planda yeniləmə başlayır</li>
            <li>4. Növbəti istifadəçi yenilənmiş versiyanı alır</li>
            <li>5. Proses davam edir</li>
          </ol>
        </div>

        <div className="bg-blue-50 p-4 rounded border mt-4">
          <h3 className="font-semibold mb-2">⚡ On-Demand Revalidation</h3>
          <p className="text-sm text-gray-600">
            Məlumatlar dəyişəndə dərhal yeniləmək üçün API endpoint yaradın və 
            <code className="bg-gray-200 px-1 rounded">revalidatePath</code> istifadə edin.
          </p>
        </div>
      </div>

      {/* Demo hissəsi */}
      <div className="bg-gray-50 p-6 rounded-lg">
        <h2 className="text-xl font-semibold mb-4">Demo: Avtomatik yenilənən məqalələr</h2>
        <p className="text-sm text-gray-600 mb-4">
          Bu səhifə 60 saniyədə bir avtomatik yenilənir:
        </p>
        
        <div className="bg-orange-100 p-3 rounded mb-4">
          <p className="text-sm font-semibold text-orange-800">
            🔄 Son render vaxtı: {renderTime}
          </p>
          <p className="text-xs text-orange-600 mt-1">
            Bu səhifə 60 saniyədə bir yenilənir. Yenilənmə zamanı köhnə versiya göstərilir.
          </p>
        </div>
        
        {error ? (
          <div className="bg-red-50 border border-red-200 rounded p-4">
            <p className="text-red-600 font-semibold">ISR xətası: {error}</p>
            <p className="text-sm text-red-500 mt-2">
              Bu xəta ISR prosesində baş verdi
            </p>
          </div>
        ) : (
          <div className="space-y-2">
            {posts?.slice(0, 5).map((post: Post) => (
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
