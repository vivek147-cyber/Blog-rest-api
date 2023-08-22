import mongoose from "mongoose";

const CategorySchema = new mongoose.Schema({

    name:{
    type : String,
    require : true,
    },
})

export const Category = mongoose.model("Category", CategorySchema);