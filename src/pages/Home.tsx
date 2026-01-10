import { useState } from "react";
import { useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";
import { PostCard } from "../components/PostCard";
import { AnimatePresence } from "framer-motion";
import type { Id } from "../../convex/_generated/dataModel";


export default function Home() {
  const [randomKey, setRandomKey] = useState(0);
  const [lastPostId, setLastPostId] = useState<Id<"posts"> | undefined>(
    undefined
  );

  const post = useQuery(api.posts.getRandomPost, {
    randomKey,
    excludePostId: lastPostId,
  });

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
       
        <AnimatePresence mode="wait">
          {post ? (
            <PostCard
              key={post._id}
              post={post}
            />
          ) : (
            <p className="text-gray-400 text-center">
              Постов пока нет
            </p>
          )}
        </AnimatePresence>
          


        <div className="mt-6 flex justify-center">
          <button
            onClick={() => {
              if (post) {
                setLastPostId(post._id);
              }
              setRandomKey(Math.random());
            }}
            className="px-4 py-2 border rounded-xl"
          >
            🔄 Другой пост
          </button>
        </div>
      </div>
  );
}

