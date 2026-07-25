import connectDB from "./db";
import { Board, Column } from "./models";




export async function initalizeUserBoard(userId: string){
    try{
        await connectDB()

        //Check if Board already exist?
         const existingBoard = await  Board.findOne({userId, name: "Job Hunt"})

         if(existingBoard){
            return existingBoard;
         }
         //Create the board
         const board =await Board.create({
            name: "Job Hunt",
            userId,
            columns:[

            ],
            //Create defult columns
         })

    } catch (err){

    }
}