import { query, mutation } from "./_generated/server";
import { v } from "convex/values";

/* === PUBLIC === */

export const getRandomPost = query({
  args: {
    randomKey: v.number(),
    excludePostId: v.optional(v.id("posts")),
  },
  handler: async ({ db }, { excludePostId }) => {
    let posts = await db.query("posts").collect();

    if (excludePostId) {
      posts = posts.filter(post => post._id !== excludePostId);
    }

    if (posts.length === 0) {
      posts = await db.query("posts").collect();
    }

    if (posts.length === 0) return null;

    const randomIndex = Math.floor(Math.random() * posts.length);
    return posts[randomIndex];
  },
});


export const getAllPostIds = query({
  handler: async ({ db }) => {
    const posts = await db.query("posts").collect();
    return posts.map((p, index) => ({
      id: p._id,
      index,
    }));
  },
});


export const getPostById = query({
  args: { id: v.id("posts") },
  handler: async ({ db }, { id }) => {
    return await db.get(id);
  },
});

export const toggleLike = mutation({
  args: {
    postId: v.id("posts"),
    delta: v.number(), // +1 или -1
  },
  handler: async (ctx, { postId, delta }) => {
    const post = await ctx.db.get(postId);
    if (!post) return;

    await ctx.db.patch(postId, {
      likes: Math.max(0, (post.likes ?? 0) + delta),
    });
  },
});