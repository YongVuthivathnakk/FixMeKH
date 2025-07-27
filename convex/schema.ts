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
    // User who made the booking
    userId: v.id("users"),
    
    // Technician assigned to the booking
    technicianId: v.id("technicians"),
    
    // Service details
    serviceType: v.union(
      v.literal("plumber"),
      v.literal("cleaner"),
      v.literal("electrician"),
      v.literal("appliance repair")
    ),
    description: v.string(),
    address: v.string(),
    location: v.optional(v.string()), // Could be coordinates or district
    
    // Scheduling
    bookingDate: v.number(), // When the booking was made (timestamp)
    serviceDate: v.string(), // Date format "YYYY-MM-DD"
    timeSlot: v.union(
      v.literal("Morning (9AM - 12PM)"),
      v.literal("Afternoon (12PM - 5PM)"),
      v.literal("Evening (5PM - 8PM)")
    ),
    
    // Status tracking
    status: v.union(
      v.literal("pending"),
      v.literal("confirmed"),
      v.literal("completed"),
      v.literal("cancelled"),
      v.literal("rescheduled")
    ),
    
    // Payment info
    price: v.number(),
    paymentMethod: v.union(
      v.literal("Cash"),
      v.literal("Bank Transfer"),
      v.literal("Credit Card"),
      v.literal("Other")
    ),
    paymentStatus: v.union(
      v.literal("pending"),
      v.literal("paid"),
      v.literal("refunded")
    ),
    
    // Additional metadata
    estimatedDuration: v.string(), // e.g. "2-3 hours"
    specialNotes: v.optional(v.string()),
    cancellationReason: v.optional(v.string()),
    rescheduledFrom: v.optional(v.id("bookings")),
    
    // System fields
    createdAt: v.number(),
    updatedAt: v.number(),
  })
  .index("by_user", ["userId"])
  .index("by_technician", ["technicianId"])
  .index("by_service_date", ["serviceDate"])
  .index("by_status", ["status"]) 
  .index("by_user_status", ["userId", "status"]),
});


export default schema;
