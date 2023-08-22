import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({

    username:{
    type : String,
    require : true,
    unique : true,
    },

    email:{
    type : String,
    require : true,
    unique : true,
    },

    password:{
        type : String,
        require : true,
        select: false,
    },

    profilepic:{
    type : String,
    default : "",
    },

},{
    timestamps : true,
})

export const User = mongoose.model("User", UserSchema);