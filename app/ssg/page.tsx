type Post = {
  userId: number;
  id: number;
  title: string;
  body: string;
};

async function getData() {
  const res = await fetch("https://jsonplaceholder.typicode.com/posts", {
    cache: "force-cache",
  });

  if (!res.ok) throw new Error("Failed to fetch data");
  return res.json();
}

export default async function SSGPage() {
  const posts: Post[] = await getData();

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">SSG - Static Site Generation</h1>
      <div>
        <p className="mb-4 text-gray-600">
          Bu səhifə build sırasında yaradıldı
        </p>
        <span>
          Yəni bu səhifələr serverdə hazır olaraq durur. İstifadəçilər bu
          səhifyə giriş etmək istədikdə ona hazır səhifə göstərilir, yenidən
          render etməyə ehtiyyac qalmır
        </span>
      </div>
      <div className="space-y-2">
        {posts?.slice(0, 5).map((post: Post) => (
          <div key={post.id} className="p-4 border rounded">
            <h2 className="font-semibold">{post.title}</h2>
            <p className="text-sm text-gray-600">{post.body}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

// Dynamic Routes for SSG
export async function generateStaticParams() {
  const posts: Post[] = await fetch(
    "https://jsonplaceholder.typicode.com/posts"
  ).then((res) => res.json());

  return posts.slice(0, 10).map((post: Post) => ({
    id: post.id.toString(),
  }));
}
