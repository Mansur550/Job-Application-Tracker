"use server";

import { getSession } from "../auth/auth";
import connectDB from "../db";

interface JobApplicationData {
    company: string;
    position: string;
    location?: string;
    notes?: string;
    salary?: string;
    jobUrl?: string;
    columnId: string;
    boardId: string;
    tags?: string[];
    description?: string;
}


export async function createJobApplication(data: JobApplicationData) {
    const session = await getSession()

    if (!session?.user){
       return {error: "Unauthorized"} 
    }
    await connectDB()

    const {
        company,
        position,
        location,
        notes,
        salary,
        jobUrl,
        columnId,
        boardId,
        tags,
        description,
    }=data;

    if (!company || !position || !columnId || !boardId) {
        return {error: "Missing required fields"}
    }

    //
    
}