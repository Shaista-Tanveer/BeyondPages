import NextAuth from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import User from '../../../../models/user';
import CredentialsProvider from "next-auth/providers/credentials";
import { connectToDB } from '../../../../utils/database';
import bcrypt from 'bcrypt'

const handler = NextAuth({
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        }),
        CredentialsProvider({
            name: "credentials",
            credentials: {
                email: { label: "email", type: "text" },
                password: { label: "password", type: "password" },
            },

            async authorize(credentials, req) {
                const { email, password } = credentials;

                try {
                    // connect to DB
                    await connectToDB();

                    // check if user already exists
                    const user =await User.findOne({ email });
                    if(!user) {
                        return false
                    }

                    // check if password is correct
                    const passwordCorrect = await bcrypt.compare(password, user.password);

                    if(!passwordCorrect) {
                        return false
                    }

                    return user

                } catch (error) {
                    console.log("Error checking if user exists: ", error.message);
                    return false
                }
                }  

        }),
    ],
    callbacks: {
        async session({ session }) {
            // store the user id from MongoDB to session
            const sessionUser = await User.findOne({ email: session.user.email });
            session.user.id = sessionUser._id.toString();

            return session;
        },
        // async signIn({ account, profile, user, credentials }) {
        //     try {
        //         await connectToDB();

        //         // check if user already exists
        //         const userExists = await User.findOne({ email: profile.email });

        //         // if not, create a new document and save user in MongoDB
        //         if (!userExists) {
        //             await User.create({
        //                 email: profile.email,
        //                 username: profile.name.replace(" ", "").toLowerCase(),
        //                 image: profile.picture,
        //             });
        //         }

        //         return true
        //     } catch (error) {
        //         console.log("Error checking if user exists: ", error.message);
        //         return false
        //     }
        // },
    },
    session : {
        jwt: true,
    }
})

export { handler as GET, handler as POST }