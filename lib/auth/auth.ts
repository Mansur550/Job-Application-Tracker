import { betterAuth } from "better-auth";
import { mongodbAdapter } from "better-auth/adapters/mongodb";
import clientPromise from "@/lib/mongodb";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { initalizeUserBoard } from "../init-user-board";

const client = await clientPromise;

export const auth = betterAuth({
    database: mongodbAdapter(client.db("jobtracker")),
    emailAndPassword: {
        enabled: true,
    },
    databaseHooks: {
        user: {
            create: {
                after: async (user) => {
                    if (user.id) {
                        await initalizeUserBoard(user.id)
                    }
                }
            }
        }
    }
});


export async function getSession() {
    const result = await auth.api.getSession({
        headers: await headers()
    })
    return result;
}

export async function signOut() {
    const result = await auth.api.signOut({
        headers: await headers()
    })
    if (result.success) {
        redirect("/")
    }
}