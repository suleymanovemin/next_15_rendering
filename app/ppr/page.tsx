import { Suspense } from "react";

// Statik hissə
function StaticContent() {
  return (
    <div className="p-4 bg-blue-50 rounded">
      <h2 className="font-bold">Statik data</h2>
      <p>Bu hissə build zamanı yaradıldı və anında göstərilir</p>
    </div>
  );
}

// Dinamik hissə
async function DynamicContent() {
  // Simulasiya edilmiş gecikmə
  await new Promise((resolve) => setTimeout(resolve, 2000));

  const res = await fetch("https://jsonplaceholder.typicode.com/posts/1", {
    cache: "no-store",
  });
  const post = await res.json();

  return (
    <div className="p-4 bg-green-50 rounded">
      <h2 className="font-bold">Dinamik data</h2>
      <p className="text-sm">{post.title}</p>
      <p className="text-xs text-gray-600 mt-2">
        Yüklənmə zamanı: {new Date().toLocaleTimeString()}
      </p>
    </div>
  );
}

export default function PPRPage() {
  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">PPR - Partial Prerendering</h1>

      <div className="space-y-4">
        <StaticContent />

        <Suspense
          fallback={
            <div className="p-4 bg-gray-50 rounded animate-pulse">
              Dinamik data yüklənir...
            </div>
          }
        >
          <DynamicContent />
        </Suspense>
      </div>
    </div>
  );
}
