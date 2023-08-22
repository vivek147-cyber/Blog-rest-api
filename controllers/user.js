import express from "express";
import {User} from "../models/user.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import  {sendcookie} from "../utils/feature.js";


export const register = async(req,res,next)=>{
  
    try
    {
    //get user data in body
    const {username , email ,password } = req.body;
    
    //acccess the email 
    let user = await User.findOne({email})

    //check if email exists already  
    if(user)
     return res.status(404).json({
        success : false,
        message : "This Email Already exits!",   
});
    
    // new user? then hash the password
    const hashedpassword = await bcrypt.hash(password,10);

    //timw to save/create the user
    user = await User.create({username , email , password:hashedpassword});
    
    //time to send cookies with user data to frontend
    sendcookie(user,res,"User has Registered Successfully",200);

    }
    catch(error)
    { 
        return  res.status(500).json({
            message : error,   
   });
    }

};

export const login = async(req,res)=>{
    
    try{
        
        //get user data in body
       const {email ,password } = req.body;
    
       //acccess the email and password
       let user = await User.findOne({email}).select("+password");

       //check if user not log in  
       if(!user)
        return  res.status(404).json({
            success : false,
            message : "Email and password not found!",   
   });

       //match the password
       const match = await bcrypt.compare(password,user.password)

       //check if pass match or not 
       if(!match)
       return  res.status(404).json({
        success : false,
        message : "password do not match",   
});
       
       //time to send cookies with user data to frontend 
       sendcookie(user, res, `Welcome back, ${user.username}`, 200);
    }
    catch(error)
    {
        return  res.status(500).json({
            message : error
   });
    }
};

export const logout = async(req,res)=>{
    
    res.status(200).cookie("token", "", {
        expires: new Date(Date.now()),
        sameSite: process.env.NODE_ENV === "Develpoment" ? "lax" : "none",
        secure: process.env.NODE_ENV === "Develpoment" ? false : true,
      })
      .json({
        success: true,
      });
};

export const getMyProfile = async(req,res)=>{
    
    const {token} = req.cookies;
    
    if(!token)
     return res.status(404).json({
             success : false,
             message : "Login First",   
    })

    const decoded = jwt.verify(token, process.env.JWT_Token);

    req.user = await User.findById(decoded._id);
    
    res.status(200).json({
        success: true,
        user: req.user,
      });

      
};



export const updateMyProfile = async(req,res)=>{
    
    const {token} = req.cookies;
    
    if(!token)
     return res.status(404).json({
             success : false,
             message : "Login First",   
    })

    const userId = req.params.id; // Extract user ID from URL parameter
    const cleanedUserId = userId.replace(/^:/, '');
    const updateData = req.body;   // Update data from request body
     

    try {
        // Find user by ID and update
        updateData.password = await bcrypt.hash(updateData.password, 10);
        const updatedUser = await User.findByIdAndUpdate(cleanedUserId, updateData, { new: true });

        if (!updatedUser) {
            return res.status(404).json({ success: false, message: 'User not found' });
        }

        return res.status(200).json({ success: true, user: updatedUser });
    } catch (error) {
        return res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
    
};