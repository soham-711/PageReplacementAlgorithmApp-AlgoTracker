import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

// Create a new user
export const createUser = mutation({
  args: {
    username: v.string(),
    fullname: v.string(),
    email: v.string(),
    image: v.string(),
    clerkId: v.string(),
  },
  handler: async (ctx, args) => {

    const existingUser = await ctx.db.query("users").withIndex("by_clerk_id",(q)=>q.eq("clerkId",args.clerkId)).first();
    if(existingUser) return

    // create a new user
    await ctx.db.insert("users", {
      username: args.username,
      fullname: args.fullname,
      email: args.email,
      image: args.image,
      fifo: 0,
      lru: 0,
      optimal: 0,
      clerkId: args.clerkId,
    });
  },
});


// Fetch user details
export const getUserByClerkId = query({
  args: { clerkId: v.string() },
  handler: async (ctx, args) => {

const existingUser = await ctx.db.query("users").withIndex("by_clerk_id",(q)=>q.eq("clerkId",args.clerkId)).first();
    if(!existingUser){
      throw new Error("User is not exist")
    }

    const user = await ctx.db
      .query("users")
      .withIndex("by_clerk_id", (q) => q.eq("clerkId", args.clerkId))
      .unique();

    return user;
  },
});
