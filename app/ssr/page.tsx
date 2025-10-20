type Post = {
  userId: number;
  id: number;
  title: string;
  body: string;
};

async function getData() {
  try {
    const res = await fetch("https://jsonplaceholder.typicode.com/posts", {
      cache: "no-store", // Hər sorğuda təzə məlumat
    });

    if (!res.ok) {
      throw new Error(`HTTP xətası: ${res.status}`);
    }
    
    return res.json();
  } catch (error) {
    console.error("Məlumat yükləmə xətası:", error);
    throw new Error("Məlumatlar serverdə yüklənə bilmədi");
  }
}

export default async function SSRPage() {
  let posts: Post[] = [];
  let error: string | null = null;
  let renderTime: string;

  try {
    posts = await getData();
    renderTime = new Date().toLocaleTimeString("az-Latn-AZ");
  } catch (err) {
    error = err instanceof Error ? err.message : "Naməlum xəta";
    renderTime = new Date().toLocaleTimeString("az-Latn-AZ");
  }

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-6">SSR - Server Side Rendering</h1>
      
      {/* İzah bloku */}
      <div className="bg-green-50 border-l-4 border-green-500 p-6 mb-8 rounded-r-lg">
        <h2 className="text-xl font-semibold mb-3 text-green-800">Nədir?</h2>
        <p className="text-gray-700 mb-4">
          Server-Side Rendering zamanı hər istifadəçi sorğusunda server tam HTML səhifəsini 
          hazırlayır və göndərir. Brauzer səhifəni qəbul edəndə artıq bütün məzmun hazırdır.
        </p>
        
        <div className="grid md:grid-cols-2 gap-4 mb-4">
          <div>
            <h3 className="font-semibold text-green-600 mb-2">✅ Üstünlüklər</h3>
            <ul className="text-sm text-gray-600 space-y-1">
              <li>• Mükəmməl SEO</li>
              <li>• İlkin görünüş dərhal</li>
              <li>• JavaScript tələb olunmur</li>
              <li>• Real-vaxt məlumatlar</li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold text-red-600 mb-2">❌ Çatışmazlıqlar</h3>
            <ul className="text-sm text-gray-600 space-y-1">
              <li>• Server yükü yüksək</li>
              <li>• TTFB artıq ola bilər</li>
              <li>• Keşləmə məhdud</li>
              <li>• Server xərcləri artır</li>
            </ul>
          </div>
        </div>

        <div className="bg-white p-4 rounded border">
          <h3 className="font-semibold mb-2">🔧 Necə işləyir?</h3>
          <ol className="text-sm text-gray-600 space-y-1">
            <li>1. İstifadəçi səhifəni istəyir</li>
            <li>2. Server API-dən məlumatları çəkir</li>
            <li>3. React komponentləri serverdə render edir</li>
            <li>4. Tam HTML səhifəsi göndərilir</li>
            <li>5. Brauzer səhifəni dərhal göstərir</li>
          </ol>
        </div>
      </div>

      {/* Demo hissəsi */}
      <div className="bg-gray-50 p-6 rounded-lg">
        <h2 className="text-xl font-semibold mb-4">Demo: Serverdə render edilən məqalələr</h2>
        <p className="text-sm text-gray-600 mb-4">
          Bu səhifə hər yeniləmədə serverdə yenidən render edilir:
        </p>
        
        <div className="bg-blue-100 p-3 rounded mb-4">
          <p className="text-sm font-semibold text-blue-800">
            🕐 Son render vaxtı: {renderTime}
          </p>
          <p className="text-xs text-blue-600 mt-1">
            Səhifəni yeniləyərək vaxtın dəyişdiyini görə bilərsiniz
          </p>
        </div>
        
        {error ? (
          <div className="bg-red-50 border border-red-200 rounded p-4">
            <p className="text-red-600 font-semibold">Server xətası: {error}</p>
            <p className="text-sm text-red-500 mt-2">
              Bu xəta serverdə render zamanı baş verdi
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
