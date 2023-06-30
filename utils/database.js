import mongoose from 'mongoose';

let isConnected = false; // track connection status

export const connectToMongoDB = async () => {
    mongoose.set('strictQuery', true) // Sets mongoose options (prevents warnings)

    if (isConnected) {
        console.log("MongoDB already connected.")
        return;
    }

    try {
        await mongoose.connect(process.env.MONGODB_URI, {
            dbName: 'TaskPro',
            useNewUrlParser: true,
            useUnifiedTopology: true
        }).then(() => {
            isConnected = true;
            console.log("MongoDB connected.")
        })
    } catch (error) {
        console.log(error)
    }
}
