import { v } from "convex/values";
import { mutation } from "./_generated/server";

// Define a mutation for creating a new user
export const CreateUser  = mutation({
    // Define the arguments that the mutation accepts
    args: {
        name: v.string(),
        email: v.string(),
        picture: v.string(),
    },
    // Define the handler function for the mutation
    handler: async (ctx, args) => {
        // Query the 'users' table to check if a user with the provided email already exists
        const user = await ctx.db.query('users').filter(q => q.eq(q.field('email'), args.email)).collect();
        
        // Check if the user array is empty (i.e., the user does not exist)
        if (user?.length == 0) {
            // If the user does not exist, prepare the data for the new user
            const data = {
                name: args.name,        
                email: args.email,      
                picture: args.picture,  
                credits: 5000,    
            };
            const result = await ctx.db.insert('users', data);
            return data;
        }
        return user[0]; // return the existing user data
    }
});