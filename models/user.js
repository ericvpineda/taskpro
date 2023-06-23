import {model, models, Schema} from 'mongoose'

// User Model 
const UserSchema = new Schema({
    username: {
        type: String,
        required: [true, 'Username required.'],
        match: [
            /^(?=.{8,15}$)(?![_.])(?!.*[_.]{2})[a-zA-Z0-9._]+(?<![_.])$/,
            "Invalid username. It should contain 8-15 alphanumeric characters and be unique."
        ],
    },
    email: {
        type: String,
        unqiue: [true, 'Email already exists.'],
        required: [true, 'Email required.']
    },
    image: {
        type: String,
    }
})

const User = models.User || model("User", UserSchema)
export default User