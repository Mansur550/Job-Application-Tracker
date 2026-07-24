import { betterAuth } from "better-auth";
import { mongodbAdapter } from "better-auth/adapters/mongodb";
import clientPromise from "@/lib/mongodb";

const client = await clientPromise;

export const auth = betterAuth({
  database: mongodbAdapter(client.db("jobtracker")),
  emailAndPassword: {
    enabled: true,
  },
});