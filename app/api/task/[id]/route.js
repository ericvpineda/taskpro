import { connectToMongoDB } from "@utils/database";
import Task from "@models/task";

export const GET = async (request , {params}) => {
    try {
        await connectToMongoDB()
        const task = await Task.findById(params.id).populate('author')
        return new Response(JSON.stringify(task), {
            status: 200
        })
    } catch (error) {
        return new Response("Failed to fetch task.", {
            status: 500
        })
    }
}

export const PATCH = async (request , {params}) => {

    const updates = await request.json();

    try {
        await connectToMongoDB()
        const task = await Task.findById(params.id).populate('author')
        if (!task) {
            return new Response("Task not found.", {status: 404})
        }
        
        task.name = updates.name
        task.desc = updates.desc
        task.status = updates.status
        task.date = new Date(updates.date)
        await task.save()
        return new Response(JSON.stringify(task), {
            status: 200
        })
    } catch (error) {
        return new Response("Failed to edit task.", {
            status: 500
        })
    }
}

export const DELETE = async (request , {params}) => {

    try {
        await connectToMongoDB()
        await Task.findByIdAndDelete(params.id)
        return new Response("Task successfuly deleted.", { status: 200 })
    } catch (error) {
        return new Response("Failed to delete task.", {
            status: 500
        })
    }
}