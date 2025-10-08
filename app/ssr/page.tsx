type Post = {
  userId: number;
  id: number;
  title: string;
  body: string;
};

async function getData() {
  const res = await fetch("https://jsonplaceholder.typicode.com/posts", {
    cache: "no-store", // No cache
  });

  if (!res.ok) throw new Error("Failed to fetch data");
  return res.json();
}

export default async function SSRPage() {
  const posts: Post[] = await getData();

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">SSR - Server Side Rendering</h1>
      <p className="mb-4 text-gray-600">
        Səhifə hər istəkdə serverdə render edilir -{" "}
        {new Date().toLocaleTimeString()}
      </p>
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
