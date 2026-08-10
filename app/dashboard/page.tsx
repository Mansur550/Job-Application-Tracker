import { getSession } from "@/lib/auth/auth"
import connectDB from "@/lib/db"
import { Board } from "@/lib/models"
import { redirect } from "next/navigation"
import KanbanBoard from "@/components/ui/kanban-board"



export default async function Dashbord() {
    const session = await getSession()
    if (!session?.user) {
        redirect("/sign-in")
    }

    await connectDB()

    const board = await Board.findOne({
        userId: session.user.id,
        name: "Job Hunt",
    })

    console.log(board)

    return (
        <div className="min-h-screen bg-white border-black border-2">
            <div className="cantainer mx-auto p-6 border-red-600 border-2">
                <div className="mb-6">
                    <h1 className="text-3xl font-bold text-black">
                        Job Hunt
                    </h1>
                    <p className="text-gray-600 ">Track your job application</p>
                </div>
                <KanbanBoard />
            </div>
        </div>
    )
}