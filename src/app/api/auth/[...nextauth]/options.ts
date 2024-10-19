import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import bcryptjs from "bcryptjs";
import dbConnect from "@/lib/dbConnect";
import UserModel from "@/model/User.model";

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      id: "credentials",
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials: any): Promise<any> {
        await dbConnect();
        try {
          const user = await UserModel.findOne({
            $or: [
              { email: credentials.identifier },
              { username: credentials.identifier },
            ],
          });

          if (!user) {
            throw new Error("No user found with this credential");
          }

          if (!user.isVerified) {
            throw new Error("Please verify your account before login");
          }

          const isPasswordCorrect = await bcryptjs.compare(
            credentials.password,
            user.password
          );

          if (isPasswordCorrect) {
            return user;
          } else {
            throw new Error("Incorrect password");
          }
        } catch (error: any) {
          throw new Error(error);
        }
      },
    }),
    GoogleProvider({
      id: "google",
      name: "Google",
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      authorization: {
        params: {
          prompt: "consent",
          access_type: "offline",
          response_type: "code",
        },
      },
    }),
  ],
  callbacks: {
    async signIn({ user, account, profile }) {
      // this will execute when the sign in type is google
      try {
        if (account?.provider === "google") {
          if (
            profile?.email_verified &&
            profile.email?.endsWith("@gmail.com")
          ) {
            await dbConnect();

            const existingUser = await UserModel.findOne({
              email: profile?.email,
            });

            // if the user is not exists then we create the user
            if (!existingUser) {
              const newUser = await UserModel.create({
                username: profile?.name || profile?.email?.split("@")[0],
                email: profile?.email,
                isVerified: profile?.email_verified,
                isAcceptingMessages: true,
                messages: [],
              });

              await newUser.save();
            }

            return true;
          } else {
            return false;
          }
        }

        return true;
      } catch (error: any) {
        console.error("Error in google sign in", error);
        return false;
      }
    },
    async session({ session, token }) {
      if (token) {
        session.user._id = token._id;
        session.user.isVerified = token.isVerified;
        session.user.isAcceptingMessages = token.isAcceptingMessages;
        session.user.username = token.username;
        session.user.email = token.email;
      }

      return session;
    },
    async jwt({ token, user, account, profile }) {
      if (user) {
        token._id = user._id?.toString();
        token.isVerified = user.isVerified;
        token.isAcceptingMessages = user.isAcceptingMessages;
        token.username = user.username;
      }

      // google
      if (account?.provider === "google") {
        try {
          const userByGoogle = await UserModel.findOne({
            email: profile?.email,
          });

          if (!userByGoogle) {
            throw new Error("No user found with this email");
          }

          token._id = userByGoogle._id as string;
          token.username = userByGoogle.username;
          token.email = userByGoogle.email;
          token.isVerified = userByGoogle.isVerified;
          token.isAcceptingMessages = userByGoogle.isAcceptingMessages;
        } catch (error: any) {
          console.error("Error getting google user", error);
          throw new Error(error.message ?? "Error getting google user");
        }
      }

      return token;
    },
  },
  pages: {
    signIn: "/signin",
  },
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET,
};
