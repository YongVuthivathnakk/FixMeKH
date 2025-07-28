import { authTables } from "@convex-dev/auth/server";
import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

const schema = defineSchema({
  ...authTables,

  authSessions: defineTable({
    userId: v.id("users"),
    expirationTime: v.number(),
  }).index("userId", ["userId"]),

  users: defineTable({
    name: v.optional(v.string()),
    image: v.optional(v.string()),
    email: v.optional(v.string()),
    emailVerificationTime: v.optional(v.number()),
    phone: v.optional(v.string()),
    phoneVerificationTime: v.optional(v.number()),
    isAnonymous: v.optional(v.boolean()),
    role: v.optional(
      v.union(v.literal("user"), v.literal("admin"), v.literal("technician"))
    ),
  }).index("email", ["email"]),

  admins: defineTable({
    userId: v.id("users"),
    userName: v.string(),
    userEmail: v.string(),
  }).index("by_userId", ["userId"]),

  technicians: defineTable({
    userId: v.id("users"),
    userName: v.optional(v.string()),
    userEmail: v.optional(v.string()),
    userPhone: v.optional(v.string()),
    skills: v.optional(
  v.union(
    v.literal("plumber"),
    v.literal("cleaner"),
    v.literal("electrician"),
    v.literal("appliance repair"),
  )
),
    location: v.optional(v.string()),
    isActive: v.boolean(),
    jobCount: v.optional(v.number()),
  })
  .index("by_skills", ["skills"])
  .index("by_userId", ["userId"]),

  visits: defineTable({
    userId: v.id("users"),
    visitTime: v.number(),
  }).index("by_userId", ["userId"]),


bookings: defineTable({
    userId: v.id("users"),
    technicianId: v.id("technicians"),
    userEmail: v.optional(v.string()),
    serviceType: v.union(
      v.literal("plumber"),
      v.literal("cleaner"),
      v.literal("electrician"),
      v.literal("appliance repair")
    ),
    description: v.string(),
    address: v.string(),
    bookingDate: v.number(), // When the booking was made (timestamp)
    timeSlot: v.union(
      v.literal("Morning (9AM - 12PM)"),
      v.literal("Afternoon (12PM - 5PM)"),
      v.literal("Evening (5PM - 8PM)")
    ),
    status: v.union(
      v.literal("pending"),
      v.literal("confirmed"),
      v.literal("completed"),
      v.literal("cancelled"),
      v.literal("rescheduled")
    ),
  })
  .index("by_user", ["userId"])
  .index("by_technician", ["technicianId"])
  .index("by_status", ["status"]) 
  .index("by_user_status", ["userId", "status"]),
});


export default schema;
