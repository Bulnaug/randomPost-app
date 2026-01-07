import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  posts: defineTable({
    content: v.string(),
    createdAt: v.number(),
  }),

  likes: defineTable({
    postId: v.id("posts"),
  }),

  comments: defineTable({
    postId: v.id("posts"),
    text: v.string(),
    createdAt: v.number(),
  }),
});
