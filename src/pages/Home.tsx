import { useState, useEffect } from "react";
import { useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";
import { PostCard } from "../components/PostCard";
import { AnimatePresence } from "framer-motion";
import type { Id } from "../../convex/_generated/dataModel";
import { Comments } from "../components/Comments";
import { useTheme } from "../hooks/useTheme";
import { ArrowRight, ArrowLeft } from "lucide-react";
import { PostCounter } from "../components/PostCounter";
import { PostNavigator } from "../components/PostNavigation";
import { getNextIndex } from "../utils/getNextIndex";

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
          <PostCounter index={index} total={total}/>
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
          <PostNavigator 
            index={index}
            total={total}
            onNext={() =>
              setIndex(i => getNextIndex(i, total, "next"))
            }
            onPrev={() =>
              setIndex(i => getNextIndex(i, total, "prev"))
            }
            onRandom={goRandom}
          />
        )}
      </div>
    </div>
  );
}
