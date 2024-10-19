import { DefaultSession, Profile as NextAuthProfile } from "next-auth";

// Redefining the types
declare module "next-auth" {
  interface User {
    _id?: string;
    isVerified?: boolean;
    isAcceptingMessages?: boolean;
    username?: string;
  }
  interface Session {
    user: {
      _id?: string;
      isVerified?: boolean;
      isAcceptingMessages?: boolean;
      username?: string;
    } & DefaultSession["user"];
  }

  interface Profile extends NextAuthProfile {
    email_verified?: boolean;
  }
}

// another way of redefining the types
declare module "next-auth/jwt" {
  interface JWT {
    _id?: string;
    isVerified?: boolean;
    isAcceptingMessages?: boolean;
    username?: string;
    googleId?: string;
    name?: string;
    email?: string;
  }
}
