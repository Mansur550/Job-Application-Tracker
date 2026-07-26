import { getSession } from "@/lib/auth/auth"
import { redirect } from "next/navigation"



export default async function Dashbord() {
    const session =await getSession()
    if (!session?.user){
        redirect("/sign-in")
    }

    return <div>
        dashboard
    </div>
}