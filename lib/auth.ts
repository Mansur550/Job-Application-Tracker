import { mongodbAdapter } from "better-auth/adapters/mongodb";
import { betterAuth } from "better-auth/minimal";
import { MongoClient } from "mongodb";


const client = new MongoClient(process.env.MONGODB_URI!);
const db =client.db()
export const auth = betterAuth({
    database: mongodbAdapter(db, {
        client,
    }),
    emailAndPassword: {
        enabled: true,
    }
})