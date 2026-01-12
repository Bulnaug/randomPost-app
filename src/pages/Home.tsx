import { useState, useEffect } from "react";
import { useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";
import { PostCard } from "../components/PostCard";
import { AnimatePresence } from "framer-motion";
import type { Id } from "../../convex/_generated/dataModel";
import { Comments } from "../components/Comments";
import { useTheme } from "../hooks/useTheme";
import { ArrowRight, ArrowLeft } from "lucide-react";

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
    <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900 py-8">
      <div className="w-full max-w-2xl px-4">

        {/* Счётчик */}
        {post && (
          <div className="
              mb-4
              text-xs
              font-medium
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
                group
                px-5 py-3
                rounded-xl
                bg-white/70 dark:bg-zinc-900/80
                backdrop-blur-md
                border border-gray-300/30 dark:border-gray-700/30
                text-gray-800 dark:text-zinc-200
                hover:bg-white/90 dark:hover:bg-gray-900/90
                
                active:scale-95
                transition-all duration-200
                disabled:opacity-40 disabled:cursor-not-allowed
                disabled:hover:bg-white/70 disabled:dark:hover:bg-gray-900/70
                flex items-center gap-2
                font-medium
              "
            >
              <ArrowLeft className="w-4 h-4 text-gray-500 dark:text-zinc-100 group-hover:-translate-x-1 transition-transform duration-200" />
              <span className="hidden sm:inline">Предыдущий</span>
            </button>

            <button
              onClick={goRandom}
               className="
               hidden
               sm:block
                group
                px-5 py-3
                rounded-xl
                bg-white/70 dark:bg-zinc-900/80
                backdrop-blur-md
                border border-gray-300/30 dark:border-gray-700/30
                text-gray-800 dark:text-zinc-200
                hover:bg-white/90 dark:hover:bg-gray-900/90
                
                active:scale-95
                transition-all duration-200
                disabled:opacity-40 disabled:cursor-not-allowed
                disabled:hover:bg-white/70 disabled:dark:hover:bg-gray-900/70
                flex items-center gap-2
                font-medium
              "
            >
                🎲 Случайный
            </button>

            <button
              disabled={index === total - 1}
              onClick={() => setIndex(i => Math.min(total - 1, i + 1))}
              className="
                group
                px-5 py-3
                rounded-xl
                bg-white/70 dark:bg-zinc-900/80
                backdrop-blur-md
                border border-gray-300/30 dark:border-gray-700/30
                text-gray-800 dark:text-zinc-200
                hover:bg-white/90 dark:hover:bg-gray-900/90
                
                active:scale-95
                transition-all duration-200
                disabled:opacity-40 disabled:cursor-not-allowed
                disabled:hover:bg-white/70 disabled:dark:hover:bg-gray-900/70
                flex items-center gap-2
                font-medium
              "
            >
              <span className="hidden sm:inline">Следующий</span>
              <ArrowRight className="w-4 h-4 text-gray-500 dark:text-zinc-100 group-hover:translate-x-1 transition-transform duration-200" />
            </button>
          </div>
        )}

      </div>
    </div>
  );
}
