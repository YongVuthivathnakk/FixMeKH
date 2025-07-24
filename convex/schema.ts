import { authTables } from "@convex-dev/auth/server";
import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

const schema = defineSchema({

    ...authTables,
    
    users: defineTable({
        name: v.optional(v.string()),
        image: v.optional(v.string()),
        email: v.optional(v.string()),
        emailVerificationTime: v.optional(v.number()),
        phone: v.optional(v.string()),
        phoneVerificationTime: v.optional(v.number()),
        isAnonymous: v.optional(v.boolean()),
        role: v.optional(v.union(v.literal("user"), v.literal("admin"))),
    })
    .index("email", ["email"]),
    
    admins: defineTable({
        userId: v.id("users"),
        userName: v.string(),
    }).index("by_userId", ["userId"]),
});

export default schema;