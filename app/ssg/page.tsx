type Post = {
  userId: number;
  id: number;
  title: string;
  body: string;
};

async function getData() {
  try {
    const res = await fetch("https://jsonplaceholder.typicode.com/posts", {
      cache: "force-cache", // Build zamanı keşlənir
    });

    if (!res.ok) {
      throw new Error(`HTTP xətası: ${res.status}`);
    }
    
    return res.json();
  } catch (error) {
    console.error("Build zamanı məlumat yükləmə xətası:", error);
    throw new Error("Build zamanı məlumatlar yüklənə bilmədi");
  }
}

export default async function SSGPage() {
  let posts: Post[] = [];
  let error: string | null = null;
  let buildTime: string;

  try {
    posts = await getData();
    buildTime = new Date().toLocaleString("az-Latn-AZ");
  } catch (err) {
    error = err instanceof Error ? err.message : "Naməlum xəta";
    buildTime = new Date().toLocaleString("az-Latn-AZ");
  }

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-6">SSG - Static Site Generation</h1>
      
      {/* İzah bloku */}
      <div className="bg-purple-50 border-l-4 border-purple-500 p-6 mb-8 rounded-r-lg">
        <h2 className="text-xl font-semibold mb-3 text-purple-800">Nədir?</h2>
        <p className="text-gray-700 mb-4">
          Static Site Generation zamanı səhifələr build prosesində əvvəlcədən yaradılır və 
          statik HTML faylları kimi CDN-dən verilir. İstifadəçilər səhifəni istədikdə hazır 
          HTML alırlar.
        </p>
        
        <div className="grid md:grid-cols-2 gap-4 mb-4">
          <div>
            <h3 className="font-semibold text-green-600 mb-2">✅ Üstünlüklər</h3>
            <ul className="text-sm text-gray-600 space-y-1">
              <li>• Ən sürətli performans</li>
              <li>• Mükəmməl SEO</li>
              <li>• Server yükü yoxdur</li>
              <li>• CDN-dən sürətli yükləmə</li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold text-red-600 mb-2">❌ Çatışmazlıqlar</h3>
            <ul className="text-sm text-gray-600 space-y-1">
              <li>• Məlumatlar köhnələ bilər</li>
              <li>• Build zamanı məlumat lazımdır</li>
              <li>• Dinamik məzmun məhdud</li>
              <li>• Yenidən build lazımdır</li>
            </ul>
          </div>
        </div>

        <div className="bg-white p-4 rounded border">
          <h3 className="font-semibold mb-2">🔧 Necə işləyir?</h3>
          <ol className="text-sm text-gray-600 space-y-1">
            <li>1. Build zamanı API-dən məlumatlar çəkilir</li>
            <li>2. React komponentləri render edilir</li>
            <li>3. Statik HTML faylları yaradılır</li>
            <li>4. CDN-ə yerləşdirilir</li>
            <li>5. İstifadəçilər hazır səhifəni alır</li>
          </ol>
        </div>

        <div className="bg-yellow-50 p-4 rounded border mt-4">
          <h3 className="font-semibold mb-2">💡 Dinamik SSG üçün</h3>
          <p className="text-sm text-gray-600">
            Əgər dinamik məzmun lazımdırsa, <code className="bg-gray-200 px-1 rounded">[slug]</code> 
            kimi dinamik route yaradın və <code className="bg-gray-200 px-1 rounded">generateStaticParams</code> 
            funksiyasını istifadə edin.
          </p>
        </div>
      </div>

      {/* Demo hissəsi */}
      <div className="bg-gray-50 p-6 rounded-lg">
        <h2 className="text-xl font-semibold mb-4">Demo: Build zamanı yaradılan məqalələr</h2>
        <p className="text-sm text-gray-600 mb-4">
          Bu səhifə build zamanı yaradıldı və statik fayl kimi saxlanılır:
        </p>
        
        <div className="bg-green-100 p-3 rounded mb-4">
          <p className="text-sm font-semibold text-green-800">
            🏗️ Build vaxtı: {buildTime}
          </p>
          <p className="text-xs text-green-600 mt-1">
            Bu vaxt dəyişməz - səhifəni yeniləsəniz də eyni qalacaq
          </p>
        </div>
        
        {error ? (
          <div className="bg-red-50 border border-red-200 rounded p-4">
            <p className="text-red-600 font-semibold">Build xətası: {error}</p>
            <p className="text-sm text-red-500 mt-2">
              Bu xəta build zamanı baş verdi və səhifə yaradıla bilmədi
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
