import { connectToMongoDB } from "@utils/database";
import Task from "@models/task";

export const GET = async (request) => {
    try {
        await connectToMongoDB()
        const tasks = await Task.find({}).populate('author')
        return new Response(JSON.stringify(tasks), {
            status: 200
        })
    } catch (error) {
        return new Response(JSON.stringify("Failed to fetch all tasks"), {
            status: 500
        })
    }
}