import connectDB from "./db";
import { Board, Column } from "./models";


export async function initalizeUserBoard(userId: string){
    try{
        await connectDB()

        //Check if Board already exist?
        


    } catch (err){

    }
}