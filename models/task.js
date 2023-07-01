import { model, models, Schema } from "mongoose";

// Model for Tasks
// Note: description not required for tasks
const TaskSchema = new Schema({
    name: {
        type: String,
        required: [true, "Task name required."],
        match: [
            /^.{1,25}$/,
            "Invalid Task name. Name must between 1 and 25 characters."
        ]
    },
    desc: {
        type: String,
        match: [
            /^.{0,50}$/,
            "Invalid Task description. Description must less than or equal to 50 characters."
        ]
    },
    status: {
        type: String,
        required: [true, "Task status enum required."],
        enum: ["not-started", "in-progress", "completed"] 
    },
    date: {
        type: Date,
        required: [true, "Task date required."],
    },
    author: {
        type: Schema.Types.ObjectId,
        required: [true, "Task author required"],
        ref: "User" 
    }
})

export default models.Task || model("Task", TaskSchema);