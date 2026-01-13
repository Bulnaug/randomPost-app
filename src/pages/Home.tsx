import { useEffect } from "react";
import { useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";
import { PostCard } from "../components/PostCard";
import { AnimatePresence } from "framer-motion";
import { Comments } from "../components/Comments";
import { useTheme } from "../hooks/useTheme";
import { PostCounter } from "../components/PostCounter";
import { PostNavigator } from "../components/PostNavigation";
import { usePostNavigation } from "../hooks/usePostNavigation";

export default function Home() {
  const allPosts = useQuery(api.posts.getAllPostIds);

  const { theme, setTheme } = useTheme()

  const {
    index,
    setIndex,
    total,
    currentId,
    goNext,
    goPrev,
    goRandom
  } = usePostNavigation(allPosts);


  // корректируем индекс если постов стало меньше
  useEffect(() => {
    if (total > 0 && index >= total) {
      setIndex(total - 1);
    }
  }, [total, index]);

  

  const post = useQuery(
    api.posts.getPostById,
    currentId ? { id: currentId } : "skip"
  );

  

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
            onNext={goNext}
            onPrev={goPrev}
            onRandom={goRandom}
          />
        )}
      </div>
    </div>
  );
}
