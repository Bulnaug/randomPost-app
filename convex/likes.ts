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
