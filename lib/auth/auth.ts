import { betterAuth } from "better-auth";
import { mongodbAdapter } from "better-auth/adapters/mongodb";
import clientPromise from "@/lib/mongodb";
import { headers } from "next/headers";

const client = await clientPromise;

export const auth = betterAuth({
  database: mongodbAdapter(client.db("jobtracker")),
  emailAndPassword: {
    enabled: true,
  },
});


export async function getSession() {
    const result = await auth.api.getSession({
        headers: await headers()
    })
}