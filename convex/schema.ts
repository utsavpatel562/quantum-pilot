// Import necessary functions from the Convex library
import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

// Define the schema for the Convex application
export default defineSchema({
    // Define a table named 'users'
    users: defineTable({
        name: v.string(),
        email: v.string(),
        picture: v.string(),
        credits: v.number(),
        orderId: v.optional(v.string()),
    }),
    userAiAssistants: defineTable({
        id: v.number(),
        name: v.string(),
        title: v.string(),
        image: v.string(),
        instruction: v.string(),
        userInstruction: v.string(),
        sampleQuestions: v.any(),
        uid: v.id('users')
    })
});