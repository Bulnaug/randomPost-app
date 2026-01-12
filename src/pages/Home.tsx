import { useState, useEffect } from "react";
import { useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";
import { PostCard } from "../components/PostCard";
import { AnimatePresence } from "framer-motion";
import type { Id } from "../../convex/_generated/dataModel";
import { Comments } from "../components/Comments";
import { useTheme } from "../hooks/useTheme";

export default function Home() {
  const allPosts = useQuery(api.posts.getAllPostIds);
  const total = allPosts?.length ?? 0;

  const [index, setIndex] = useState(0);
  const { theme, setTheme } = useTheme()

  // корректируем индекс если постов стало меньше
  useEffect(() => {
    if (total > 0 && index >= total) {
      setIndex(total - 1);
    }
  }, [total, index]);

  const currentId: Id<"posts"> | null =
    allPosts && total > 0 ? allPosts[index]?.id ?? null : null;

  const post = useQuery(
    api.posts.getPostById,
    currentId ? { id: currentId } : "skip"
  );

  const goRandom = () => {
    if (!total) return;
    let next = index;
    while (next === index && total > 1) {
      next = Math.floor(Math.random() * total);
    }
    setIndex(next);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900">
      <div className="w-full max-w-2xl px-4">

        {/* Счётчик */}
        {post && (
          <div className="
              mb-4
              text-xs
              text-zinc-400
              text-center
              tracking-widest
              opacity-80
            "
          >
            {index + 1} / {total}
          </div>
        )}

        <button
          onClick={() => setTheme(prev => (prev === 'dark' ? 'light' : 'dark'))}
          className="
            absolute top-4 right-4
            p-2 rounded-full
            bg-gray-200 dark:bg-gray-700
            hover:scale-105 transition
          "
        >
          {theme === 'dark' ? '☀️' : '🌙'}
        </button>

        {/* Пост */}
        <AnimatePresence mode="wait">
          {post ? (
            <PostCard key={post._id} post={post}/>
          ) : (
            <p className="text-center text-gray-400">
              Постов пока нет
            </p>
          )}
        </AnimatePresence>

        {/* Комментарии */}
        {post && (
          <div className="mt-4">
            <Comments postId={post._id} />
          </div>
        )}

        {/* Навигация */}
        {post && (
          <div className="mt-6 flex justify-between items-center gap-4">
            <button
              disabled={index === 0}
              onClick={() => setIndex(i => Math.max(0, i - 1))}
               className="
                px-4 py-2
                rounded-full
                dark:bg-zinc-900/60
                border border-white/5
                text-sm dark:text-zinc-300
                hover:bg-gray-100
                dark:hover:bg-zinc-800
                transition
                pb-safe pt-safe
              "
            >
              ← Предыдущий
            </button>

            <button
              onClick={goRandom}
               className="
                px-4 py-2
                rounded-full
                dark:bg-zinc-900/60
                border border-white/5
                text-sm dark:text-zinc-300
                hover:bg-gray-100
                dark:hover:bg-zinc-800
                transition
                pb-safe pt-safe
              "
            >
              🎲 Случайный
            </button>

            <button
              disabled={index === total - 1}
              onClick={() => setIndex(i => Math.min(total - 1, i + 1))}
              className="
                px-4 py-2
                rounded-full
                dark:bg-zinc-900/60
                border border-white/5
                text-sm dark:text-zinc-300
                hover:bg-gray-100
                dark:hover:bg-zinc-800
                transition
                pb-safe pt-safe
              "
            >
              Следующий →
            </button>
          </div>
        )}

      </div>
    </div>
  );
}
