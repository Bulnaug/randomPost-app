import type { Id } from "../../convex/_generated/dataModel";
import { TypingPostText } from "./TypingPostText";
import { LikeButton } from "./LikeButton";

type Props = {
  post: {
    _id: Id<"posts">;
    content: string;
    likes?: number
  };
};

export function PostCard({ post }: Props) {

  return (
    <div className="relative bg-white dark:bg-zinc-900/80 rounded-2xl p-8 shadow-sm backdrop-blur max-w-prose mx-auto">
      <TypingPostText text={post.content} sound/>
      {/* UI-футер карточки */}
      <div className="mt-6 flex items-center">
        <LikeButton
          postId={post._id}
          likes={post.likes ?? 0}
        />
      </div>
    </div>
  );
}
