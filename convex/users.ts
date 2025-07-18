import { v } from "convex/values";
import { mutation, query } from "./_generated/server";
import { auth } from "./auth";

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

export const getUsers = query(async ({db}) => {
    const users = await db.query("users").collect();
    return users;
})

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
        if(userId === null) {
            throw new Error("not authenthicated");
        }
        await ctx.db.patch(userId, { phone: args.phone });
    }
})


export const defineDefaultRole = mutation( {
    args: { },
    handler: async (ctx, args) => {
        const userId = await auth.getUserId(ctx);
        if(userId === null) {
            throw new Error("not authenthicated");
        }
        await ctx.db.patch(userId, { role: "user" });
    }
});

