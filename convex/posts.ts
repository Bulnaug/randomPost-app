import { query, mutation } from "./_generated/server";
import { v } from "convex/values";

const ADMIN_KEY = process.env.ADMIN_KEY;

function assertAdmin(adminKey?: string) {
  if (!adminKey || adminKey !== ADMIN_KEY) {
    throw new Error("Unauthorized");
  }
}

/* === ADMIN === */

export const getAllPosts = query({
  handler: async ({ db }) => {
    return await db.query("posts").order("desc").collect();
  },
});

export const createPostAdmin = mutation({
  args: {
    content: v.string(),
    adminKey: v.string(),
  },
  handler: async ({ db }, { content, adminKey }) => {
    assertAdmin(adminKey);
    await db.insert("posts", {
      content,
      createdAt: Date.now(),
    });
  },
});

export const updatePost = mutation({
  args: {
    postId: v.id("posts"),
    content: v.string(),
    adminKey: v.string(),
  },
  handler: async ({ db }, { postId, content, adminKey }) => {
    assertAdmin(adminKey);
    await db.patch(postId, { content });
  },
});

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

    // fallback, если остался 0 или 1 пост
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