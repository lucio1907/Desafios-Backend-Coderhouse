import mongoose from "mongoose";

const productsModel = mongoose.Schema({
  title: {
    type: String,
    max: 50,
    trim: true,
    required: true,
  },
  price: {
    type: String,
    required: true,
    trim: true,
  },
  url: {
    type: String,
    trim: true,
    required: true,
  },
},
{
    timestamps: true
});

export default productsModel;
