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
    <div className="
      relative
      mx-auto
      max-w-prose
      rounded-2xl
      p-8 sm:p-8
      dark:bg-zinc-900/80
      backdrop-blur
      dark:shadow-[0_10px_40px_rgba(0,0,0,0.5)]
      ring-1 ring-white/5
      bg-white
      shadow-sm
      max-w-prose
    ">
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
