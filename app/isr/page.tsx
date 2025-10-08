async function getData() {
  const res = await fetch("https://jsonplaceholder.typicode.com/posts", {
    next: { revalidate: 60 }, // 60 saniyəde bir yenilənir
  });

  if (!res.ok) throw new Error("Failed to fetch data");
  return res.json();
}

export const revalidate = 60; // yenilənmə müddəti 60 saniyə

type Post = {
  userId: number;
  id: number;
  title: string;
  body: string;
};

export default async function ISRPage() {
  const posts: Post[] = await getData();
  const buildTime = new Date().toLocaleString("tr-TR");

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">
        ISR - Incremental Static Regeneration
      </h1>
      <p className="mb-4 text-gray-600">
        Son yenilənmə: {buildTime} ( 60 saniyəde bir yenilənir )
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

// On-Demand Revalidation nümunəsi
// app/api/revalidate/route.js olaraq yaza bilərsiz
import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const { path } = await request.json();

  try {
    revalidatePath(path);
    return NextResponse.json({ revalidated: true, now: Date.now() });
  } catch (error) {
    // log the error so it's not unused and to aid debugging
    console.error("Revalidation failed:", error);
    return NextResponse.json({ revalidated: false }, { status: 500 });
  }
}
