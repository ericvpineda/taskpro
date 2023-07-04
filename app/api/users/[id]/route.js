import User from "@models/user";
import { connectToMongoDB } from "@utils/database";

export const GET = async (request, {params}) => {

    const userId = params.id;

    try {

        await connectToMongoDB()

        const user = await User.findById(userId);
        return new Response(JSON.stringify(user), {
            status: 200
        });
        
    } catch (error) {
        return new Response(JSON.stringify("Failed to get user."), {
            status: 500
        })
    }
}