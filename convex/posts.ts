import { query, mutation } from "./_generated/server";
import { v } from "convex/values";
import { assertAdmin } from "./auth";

/* === ADMIN === */

export const getAllPosts = query({
  handler: async ({ db }) => {
    return await db.query("posts").order("desc").collect();
  },
});

export const createPostAdmin = mutation({
  args: {
    content: v.string(),
  },
  handler: async (ctx, { content }) => {
    await assertAdmin(ctx);
    await ctx.db.insert("posts", {
      content,
      createdAt: Date.now(),
    });
  },
});

export const updatePost = mutation({
  args: {
    postId: v.id("posts"),
    content: v.string(),
  },
  handler: async (ctx, { postId, content }) => {
    await assertAdmin(ctx);
    await ctx.db.patch(postId, { content });
  },
});

export const deletePost = mutation({
  args: {
    postId: v.id("posts"),
  },
  handler: async (ctx, { postId }) => {
    await assertAdmin(ctx);
    await ctx.db.delete(postId);
  },
});

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

export const createPost = mutation({
  args: { content: v.string() },
  handler: async ({ db }, { content }) => {
    await db.insert("posts", {
      content,
      createdAt: Date.now(),
    });
  },
});