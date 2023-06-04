import { connectDB } from "@/util/database";
import { MongoDBAdapter } from "@next-auth/mongodb-adapter";
import { MongoClient } from "mongodb";
import NextAuth from "next-auth";
import GithubProvider from "next-auth/providers/github";

export const authOptions = {
  providers: [
    GithubProvider({
      clientId: process.env.NEXT_PUBLIC_GiT_CLIENT_ID!,
      clientSecret: process.env.NEXT_PUBLIC_GiT_CLIENT_SECRET!,
    }),
  ],
  secret: process.env.NEXT_PUBLIC_SECRET,
  adapter: MongoDBAdapter(connectDB as Promise<MongoClient>)
};
export default NextAuth(authOptions); 