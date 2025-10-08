"use client";
import { useState, useEffect } from "react";

type Post = {
  userId: number;
  id: number;
  title: string;
  body: string;
};

export default function CSRPage() {
  const [data, setData] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/posts")
      .then((res) => res.json())
      .then((data) => {
        setData(data);
        setLoading(false);
      });
  }, []);

  if (loading)
    return (
      <div className="flex items-center justify-center h-screen font-bold">
        Datalar yüklənir...
      </div>
    );

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">CSR - Client Side Rendering</h1>
      <div className="space-y-2">
        {data?.slice(0, 5).map((post: Post) => (
          <div key={post.id} className="p-4 border rounded">
            <h2 className="font-semibold">{post.title}</h2>
          </div>
        ))}
      </div>
    </div>
  );
}
