import mongoose from "mongoose";

const schema = mongoose.Schema({
    productName: {
        type: String,
        trim: true,
        required: true
    },
    description: {
        type: String,
        trim: true,
        required: true
    },
    stock: {
        type: Number,
        trim: true,
        required: true
    },
    price: {
        type: Number,
        trim: true,
        required: true
    }
},
{
    timestamps: true
});

export default schema;