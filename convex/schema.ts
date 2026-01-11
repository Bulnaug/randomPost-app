import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  posts: defineTable({
    content: v.string(),
    createdAt: v.number(),
    likes: v.optional(v.number()),
  }),

  likes: defineTable({
    postId: v.id("posts"),
  }),

  comments: defineTable({
    postId: v.id("posts"),
    text: v.string(),
    createdAt: v.number(),
  }).index("by_post", ["postId"]),

  users: defineTable({
    email: v.string(),
    role: v.union(v.literal("admin"), v.literal("user")),
  }).index("by_email", ["email"]),
});
