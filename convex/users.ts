import { v } from "convex/values";
import { mutation, query } from "./_generated/server";
import { auth } from "./auth";
import { Id } from "./_generated/dataModel";


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


export const getUsers = query(async ({ db }) => {
    const users = await db.query("users").collect();
    return users;
})


export const getUserById = query({
    args: { _id: v.string() },
    handler: async (ctx, args) => {
        const user = await ctx.db.get(args._id as Id<"users">);
        return user;
    }
});

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

export const updateUserRole = mutation({
    args: {
        userId: v.string(),
        newRole: v.optional(v.union(v.literal("user"), v.literal("admin"))),
    },
    handler: async (ctx, args) => {
        const userId = args.userId as Id<"users">;

        // Update the user's role
        await ctx.db.patch(userId, {
            role: args.newRole,
        });

        if (args.newRole === "admin") {
            // Add to admins table if not exists
            const alreadyAdmin = await ctx.db
                .query("admins")
                .withIndex("by_userId", (q) => q.eq("userId", userId))
                .unique();

            if (!alreadyAdmin) {
                const user = await ctx.db.get(userId);
                if (!user || !user.name) throw new Error("User not found of has no name");

                await ctx.db.insert("admins", {
                    userId,
                    userName: user.name,
                });
            }
        } else if (args.newRole === "user") {
            // Remove from admins table if exists
            const wasAdmin = await ctx.db
                .query("admins")
                .withIndex("by_userId", (q) => q.eq("userId", userId))
                .unique();

            if (wasAdmin) {
                await ctx.db.delete(wasAdmin._id);
            }
        }
        // If newRole is undefined, you can decide what to do here (optional)
    },
});


export const setEmailVarifiactionTime = mutation({
    args: {},
    handler: async (ctx) => {
        const userId = await auth.getUserId(ctx);
        if (!userId) {
            return null;
        }
        await ctx.db.patch(userId, {
            emailVerificationTime: Date.now(),
        })
    }
})

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
})