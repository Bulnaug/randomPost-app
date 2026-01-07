import { useState } from "react";
import { useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";
import { PostCard } from "../components/PostCard";

export function Home() {
  const [randomKey, setRandomKey] = useState(0);

  const post = useQuery(api.posts.getRandomPost, {
    randomKey,
  });

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="w-full max-w-xl bg-white rounded-2xl shadow-lg p-6">
        <h1 className="text-2xl font-bold mb-4 text-center">
          Random Post
        </h1>

        {post ? (
          <PostCard post={post} />
        ) : (
          <p className="text-gray-400 text-center">
            Постов пока нет
          </p>
        )}

        <div className="mt-6 flex justify-center">
          <button
            onClick={() => setRandomKey(Math.random())}
            className="px-4 py-2 border rounded-xl"
          >
            🔄 Другой пост
          </button>
        </div>
      </div>
    </div>
  );
}