import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

// Get all technicians
export const getTechnicians = query({
  handler: async (ctx) => {
    const technicians = await ctx.db.query("technicians").collect();
    return technicians;
  }
});

// Create a technician
export const createTechnician = mutation({
  args: {
    userId: v.id("users"),
    skills: v.optional(
      v.union(
        v.literal("plumber"),
        v.literal("cleaner"),
        v.literal("electrician"),
        v.literal("appliance repair")
      )
    ),
    location: v.optional(v.string()),
    isActive: v.boolean(),
    jobCount: v.optional(v.number()),
  },
  handler: async (ctx, args) => {
    const user = await ctx.db.get(args.userId);
    if (!user) throw new Error("User not found");

    // Prevent admin users from being converted to technicians
    if (user.role === "admin") {
      throw new Error("Cannot assign admin users as technicians.");
    }

    // Insert into technicians table
    await ctx.db.insert("technicians", {
      userId: args.userId,
      userName: user.name,
      userEmail: user.email,
      userPhone: user.phone,
      skills: args.skills ?? undefined,
      location: args.location ?? "",
      isActive: args.isActive,
      jobCount: args.jobCount ?? 0,
    });

    // Update user role to "technician"
    await ctx.db.patch(args.userId, {
      role: "technician",
    });
  },
});


export const getTechniciansBySkill = query({
  args: {
    skill: v.union(
      v.literal("plumber"),
      v.literal("cleaner"),
      v.literal("electrician"),
      v.literal("appliance repair")
    ),
  },
  handler: async (ctx, args) => {
    const technicians = await ctx.db
      .query("technicians")
      .withIndex("by_skills", (q) => q.eq("skills", args.skill))
      .collect();

    return technicians;
  },
});

