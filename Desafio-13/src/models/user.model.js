import mongoose from "mongoose";

const newUserSchema = mongoose.Schema({
    username: {
        type: String,
        min: 4,
        max: 50,
        trim: true,
        required: true
    },
    email: {
        type: String,
        trim: true,
        required: true
    },
    password: {
        type: String,
        min: 4,
        max: 50,
        trim: true,
        required: true
    }
}, 
{
    timestamps: true
})

const userModel = mongoose.model("user", newUserSchema);
export default userModel;