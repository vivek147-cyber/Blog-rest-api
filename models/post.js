import mongoose from "mongoose";

const PostSchema = new mongoose.Schema({

    title:{
    type : String,
    require : true,
    unique : true,
    },

    desc:{
    type : String,
    require : true,
    },

    photo:{
        type : String,
        require : false,
    },

    userId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },

    categories:{
        type : Array,
        require : false,
    },
},{
    timestamps : true,
})

export const Post = mongoose.model("Post", PostSchema);