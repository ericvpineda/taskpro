import { connectToMongoDB } from "@utils/database"
import Task from "@models/task"

// POST route to create new task and save task to db  
export const POST = async (request) => {
    
    // Steps
    // 1. get request data from Form.jsx 
    // 2. try catch to create new task in db and save 
    // 3. return new json stringified response with status 201 if success
    // 4. return error response with status 500 

    const {name, desc, status, date, userId} = await request.json()

    try {
        
        await connectToMongoDB() 

        const newTask = new Task({
            name, desc, status, date, author: userId,
        }) 

        await newTask.save()
    
        return new Response(JSON.stringify(body), {
            status: 201
        })
    } catch (error) {
        return new Response("Failure creating new task.", {
            status: 500
        })
    }
    
}
