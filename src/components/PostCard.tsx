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

  const likes = post.likes ?? 0;

  return (
    <div className="relative bg-white rounded-2xl p-8 shadow-sm max-w-prose mx-auto">
      <TypingPostText text={post.content} sound/>
      <LikeButton
        postId={post._id}
        likes={likes}
      />
    </div>
  );
}
