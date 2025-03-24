// Import necessary functions from the Convex library
import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

// Define the schema for the Convex application
export default defineSchema({
    // Define a table named 'users'
    users: defineTable({
        // Define the 'name' field as a string
        name: v.string(),
        
        // Define the 'email' field as a string
        email: v.string(),
        
        // Define the 'picture' field as a string (presumably a URL to the user's picture)
        picture: v.string(),
        
        // Define the 'credits' field as a number (could represent user credits or points)
        credits: v.number(),
        
        // Define the 'orderId' field as an optional string (could be used to link to an order)
        orderId: v.optional(v.string()),
    })
});