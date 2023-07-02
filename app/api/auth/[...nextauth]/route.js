import NextAuth from "next-auth/next";
import GoogleProvider from 'next-auth/providers/google'
import { connectToMongoDB } from "@utils/database";
import User from "@models/user"

// Route to handle authentication and sessions 
// Note: need to wrap call back fxns with callbacks object
const handler = NextAuth({
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET
        })
    ],
    callbacks: {
        async session({ session }) {
            const sessionUser = await User.findOne({
                email: session.user.email
            })
            if (sessionUser) {
                session.user.id = sessionUser._id.toString()
            }
            return session 
        },
        async signIn({ profile }) {
            try {
                await connectToMongoDB()
    
                // // Check if user already exists
                const userExists = await User.findOne({ email: profile.email })
                
                // // If not, create new user and save to db
                if (!userExists) {
                    await User.create({
                        email: profile.email,
                        username: profile.name.replace(" ", "").toLowerCase(),
                        image: profile.picture
                    })
                }
                return true; 
            } catch (error) {
                console.error(error)
                return false;
            }
        }
    }
})

export { handler as GET, handler as POST}