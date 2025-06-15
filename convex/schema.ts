import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  users: defineTable({
    username: v.string(),
    fullname: v.string(),
    email: v.string(),
    image: v.string(),
    fifo: v.optional(v.number()),
    lru: v.optional(v.number()),
    optimal: v.optional(v.number()),
    clerkId: v.string()
  }).index("by_clerk_id", ["clerkId"]),
});
