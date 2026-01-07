import { query, mutation } from "./_generated/server";
import { v } from "convex/values";

export const getRandomPost = query({
  args: {
    randomKey: v.number(),
  },
  handler: async ({ db }) => {
    const posts = await db.query("posts").collect();
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
