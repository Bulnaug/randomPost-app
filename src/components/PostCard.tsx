import { LikeButton } from "./LikeButton";
import { Comments } from "./Comments";
import type { Id } from "../../convex/_generated/dataModel";

type Props = {
  post: {
    _id: Id<"posts">;
    content: string;
  };
};

export function PostCard({ post }: Props) {
  return (
    <>
      <p className="text-gray-800 text-center text-lg mb-6">
        {post.content}
      </p>

      <div className="flex justify-center mb-4">
        <LikeButton postId={post._id} />
      </div>

      <Comments postId={post._id} />
    </>
  );
}
