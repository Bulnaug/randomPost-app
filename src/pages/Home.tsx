import { useState } from "react";
import { useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";
import { PostCard } from "../components/PostCard";
import { AnimatePresence } from "framer-motion";
import type { Id } from "../../convex/_generated/dataModel";
import { useMutation } from "convex/react";
import { useUser, SignInButton, SignUpButton, SignOutButton } from "@clerk/clerk-react";
import { SignedIn } from "@clerk/clerk-react";

export default function Home() {
  const [randomKey, setRandomKey] = useState(0);
  const [lastPostId, setLastPostId] = useState<Id<"posts"> | undefined>(
    undefined
  );
  const [newPost, setNewPost] = useState("");
  const createPost = useMutation(api.posts.createPost);

  const { user } = useUser();


  const post = useQuery(api.posts.getRandomPost, {
    randomKey,
    excludePostId: lastPostId,
  });

  const isAdmin =
    (user?.publicMetadata as { role?: string })?.role === "admin";

  if (!user) return null;

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
       
      <div className="w-full max-w-xl bg-white rounded-2xl shadow-lg p-6">
        <div className="flex justify-between mb-4">
        <div>Привет, {user.username ?? user.firstName}</div>
        <SignOutButton />
      </div>
        <h1 className="text-2xl font-bold mb-4 text-center">
          Random Post
        </h1>

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
          <SignedIn>
            {isAdmin ? (
              <div className="mb-6">
                <textarea
                  value={newPost}
                  onChange={e => setNewPost(e.target.value)}
                  placeholder="Новый пост..."
                  className="w-full border rounded p-2"
                />
                <button
                  onClick={() => {
                    if (!newPost.trim()) return;
                    createPost({ content: newPost });
                    setNewPost("");
                  }}
                  className="mt-2 px-4 py-2 bg-black text-white rounded"
                >
                  ➕ Добавить пост
                </button>
              </div>
            ) : null}
          </SignedIn>


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
    </div>
  );
}

