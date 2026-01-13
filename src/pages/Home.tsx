import { AnimatePresence } from "framer-motion";
import { useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";
import { PostCard } from "../components/post/PostCard";
import { Comments } from "../components/comments/Comments";
import { PostCounter } from "../components/PostCounter";
import { PostNavigator } from "../components/PostNavigation";
import { ThemeToggleButton } from "../components/common/ThemeToogleButton";
import { usePostNavigation } from "../hooks/usePostNavigation";
import { useCurrentPost } from "../hooks/useCurrentPost";
import { getRandomIndex } from "../utils/random";

export default function Home() {
  const allPosts = useQuery(api.posts.getAllPostIds);
  
  const {
    index,
    setIndex,
    total,
    currentId,
    goNext,
    goPrev,
  } = usePostNavigation(allPosts);

  const post = useCurrentPost(currentId);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900 py-8">
      <div className="w-full max-w-2xl px-4">

        {/* Кнопка темы */}
        <ThemeToggleButton />

        {/* Счётчик */}
        {post && (<PostCounter index={index} total={total}/>)}

        
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
            onRandom={() => setIndex(getRandomIndex(index, total))}
          />
        )}
      </div>
    </div>
  );
}
