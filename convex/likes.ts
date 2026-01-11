import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

export const likePost = mutation({
  args: { postId: v.id("posts") },
  handler: async ({ db }, { postId }) => {
    await db.insert("likes", { postId });
  },
});

export const countLikes = query({
  args: { postId: v.id("posts") },
  handler: async ({ db }, { postId }) => {
    const likes = await db
      .query("likes")
      .filter(q => q.eq(q.field("postId"), postId))
      .collect();

    return likes.length;
  },
});

export const toggleLike = mutation({
  args: {
    postId: v.id("posts"),
    liked: v.boolean(), // true = поставить, false = снять
  },
  handler: async ({ db }, { postId, liked }) => {
    const post = await db.get(postId);
    if (!post) return;

    await db.patch(postId, {
      likes: Math.max(0, post.likes ?? 0 + (liked ? 1 : -1)),
    });
  },
});