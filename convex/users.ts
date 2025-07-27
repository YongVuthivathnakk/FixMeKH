import { v } from "convex/values";
import { mutation, query } from "./_generated/server";
import { auth } from "./auth";
import { Id } from "./_generated/dataModel";

// Get the current user
export const current = query({
    args: {},
    handler: async (ctx) => {
        const userId = await auth.getUserId(ctx);
        if (userId === null) {
            return null;
        }

        return await ctx.db.get(userId);
    }
})

// Get all users
export const getUsers = query(async ({ db }) => {
    const users = await db.query("users").collect();
    return users;
})


// Get user by ID
export const getUserById = query({
    args: { _id: v.string() },
    handler: async (ctx, args) => {
        const user = await ctx.db.get(args._id as Id<"users">);
        return user;
    }
});

// Get the user role
export const userRole = query({
    args: {},
    handler: async (ctx) => {
        const userId = await auth.getUserId(ctx);
        if (userId === null) {
            return null;
        }

        // Get the user document from the "users" table
        const user = await ctx.db.get(userId);
        if (!user) {
            return null;
        }

        // Return the role field
        return user.role;
    }
})

// Update phone column
export const updatePhone = mutation({
    args: { phone: v.string() },
    handler: async (ctx, args) => {
        const userId = await auth.getUserId(ctx);
        if (userId === null) {
            throw new Error("not authenthicated");
        }
        await ctx.db.patch(userId, { phone: args.phone });
    }
})

// Assign default for the users
export const defineDefaultRole = mutation({
    args: {},
    handler: async (ctx, args) => {
        const userId = await auth.getUserId(ctx);
        if (userId === null) {
            throw new Error("not authenthicated");
        }
        await ctx.db.patch(userId, { role: "user" });
    }
});


// Update the user role based on the ID
export const updateUserRole = mutation({
  args: {
    userId: v.string(),
    newRole: v.optional(v.union(
      v.literal("user"),
      v.literal("admin")
    )),
  },
  handler: async (ctx, args) => {
    const userId = args.userId as Id<"users">;

    // Fetch current user to check their current role
    const user = await ctx.db.get(userId);
    if (!user) {
      throw new Error("User not found");
    }

    // Step 1: Update user role
    await ctx.db.patch(userId, {
      role: args.newRole,
    });

    // Step 2: Handle admin insert/delete
    if (args.newRole === "admin") {
      const alreadyAdmin = await ctx.db
        .query("admins")
        .withIndex("by_userId", (q) => q.eq("userId", userId))
        .unique();

      if (!alreadyAdmin && user.name && user.email) {
        await ctx.db.insert("admins", {
          userId,
          userName: user.name,
          userEmail: user.email,
        });
      }
    } else {
      const wasAdmin = await ctx.db
        .query("admins")
        .withIndex("by_userId", (q) => q.eq("userId", userId))
        .unique();

      if (wasAdmin) {
        await ctx.db.delete(wasAdmin._id);
      }
    }

    // If role was previously 'technician', delete from technicians table
    if (user.role === "technician") {
      const technician = await ctx.db
        .query("technicians")
        .withIndex("by_userId", (q) => q.eq("userId", userId))
        .unique();

      if (technician) {
        await ctx.db.delete(technician._id);
      }
    }
  },
});


// Verify each time the user login / sign in
export const setEmailVarifiactionTime = mutation({
  args: {},
  handler: async (ctx) => {
    const userId = await auth.getUserId(ctx);
    if (!userId) return null;

    await ctx.db.patch(userId, {
      emailVerificationTime: Date.now(),
    });
  },
});

export const setPhoneVerificationTime = mutation({
    args: {},
    handler: async (ctx) => {
        const userId = await auth.getUserId(ctx);
        if(!userId) {
            return null;
        }
        await ctx.db.patch(userId, {
            phoneVerificationTime: Date.now(),
        })
    }
});