import { connectToMongoDB } from "@utils/database";
import Task from "@models/task";

export const GET = async (request, {params}) => {

    const userId = params.id

    try {
        await connectToMongoDB()
        const userTasks = await Task.find({author: userId}).populate('author')
        return new Response(JSON.stringify(userTasks), {
            status: 200
        }) 
        
    } catch (error) {
        return new Response(JSON.stringify("Failed to get user tasks."), {
            status: 500
        })
    }
}