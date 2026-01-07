import { query, mutation } from "./_generated/server";
import { v } from "convex/values";

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
