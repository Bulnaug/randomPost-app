import { useState } from "react";
import { useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";
import { PostCard } from "../components/PostCard";
import { AnimatePresence } from "framer-motion";
import type { Id } from "../../convex/_generated/dataModel";
import { LikeButton } from "../components/LikeButton";
import { Comments } from "../components/Comments";


export default function Home() {
  const [randomKey, setRandomKey] = useState(0);
  const [lastPostId, setLastPostId] =
    useState<Id<"posts"> | undefined>(undefined);

  const allPosts = useQuery(api.posts.getAllPostIds);
  const post = useQuery(api.posts.getRandomPost, {
    randomKey,
    excludePostId: lastPostId,
  });

  const total = allPosts?.length ?? 0;

  const currentIndex =
    post && allPosts
      ? allPosts.findIndex(p => p.id === post._id) + 1
      : null;

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="w-full max-w-2xl px-4">

        {/* Счётчик */}
        {post && currentIndex && (
          <div className="mb-4 text-xs uppercase tracking-widest text-gray-400 text-center">
            {currentIndex} / {total}
          </div>
        )}

        {/* Карточка */}
        <AnimatePresence mode="wait">
          {post ? (
            <PostCard key={post._id} post={post} />
          ) : (
            <p className="text-center text-gray-400">
              Постов пока нет
            </p>
          )}
        </AnimatePresence>

        {/* Лайк */}
        {post && (
          <div className="mt-4 flex justify-center">
            <LikeButton postId={post._id} />
          </div>
        )}

        {/* Комментарии */}
        {post && (
          <div className="mt-4">
            <Comments postId={post._id} />
          </div>
        )}

        {/* Кнопка */}
        <div className="mt-6 flex justify-center">
          <button
            onClick={() => {
              if (post) setLastPostId(post._id);
              setRandomKey(Math.random());
            }}
            className="
              px-5 py-2
              rounded-full
              border
              text-sm
              text-gray-600
              hover:bg-gray-100
            "
          >
            🔄 Другой пост
          </button>
        </div>

      </div>
    </div>
  );
}

