import express from "express";
import {Post} from "../models/post.js";


export const createBlog = async(req,res)=>{
    
    const {token} = req.cookies;
    
    if(!token)
     return res.status(404).json({
             success : false,
             message : "Login First",   
    })

    const newblog = new Post(req.body);
    try {
       const post = await newblog.save();
       res.status(200).json(post);
    } catch (error) {
        res.status(500).json(error);
    }
};


export const updateBlog = async(req,res)=>{
    const {token} = req.cookies;
    
    if(!token)
     return res.status(404).json({
             success : false,
             message : "Login First",   
    })

    const userId = req.params.id; // Extract user ID from URL parameter
    const cleanedUserId = userId.replace(/^:/, '');
    const updateData = req.body; 
    try {
        const post = await Post.findById(cleanedUserId);
        // console.log(post)
        if(post.username === req.body.username)
        {
        try {
           const updatepost = await Post.findByIdAndUpdate(cleanedUserId,updateData,{ new : true});
           res.status(200).json({ success: true, newpost: updatepost });
        } catch (error) {
            res.status(500).json(error);
        }
       }
       else {
            res.status(401).json("You can update only your post!")
      }
    } catch (error) {
        res.status(500).json(error);
    }
};


export const deleteBlog = async(req,res)=>{
    const {token} = req.cookies;
    
    if(!token)
     return res.status(404).json({
             success : false,
             message : "Login First",   
    })

    const userId = req.params.id; // Extract user ID from URL parameter
    const cleanedUserId = userId.replace(/^:/, '');
    try {
        const post = await Post.findById(cleanedUserId);
        
        if(post.username === req.body.username)
        {
        try {
           await Post.findByIdAndDelete(cleanedUserId);
           res.status(200).json("The post is successfully deleted.");
        } catch (error) {
            res.status(500).json(error);
        }
       }
       else {
            res.status(401).json("You can delete only your post!")
      }
    } catch (error) {
        res.status(500).json(error);
    }
};


export const getBlog = async(req,res)=>{

    const {token} = req.cookies;
    
    if(!token)
     return res.status(404).json({
             success : false,
             message : "Login First",   
    })

    const userId = req.params.id; // Extract user ID from URL parameter
    const cleanedUserId = userId.replace(/^:/, '');
        try {
          const post = await Post.findById(cleanedUserId).populate('userId');
          res.status(200).json(post)
        } catch (error) {
          res.status(404).json(error)
        }
};

export const getallBlog = async(req,res)=>{

    const catName = req.query.cat
    try {
      let posts
      if (catName) {
        posts = await Post.find({
          categories: {
            $in: [catName],
          },
        })
      } else {
        posts = await Post.find().populate('userId');
      }
      res.status(200).json(posts)
    } catch (error) {
      res.status(404).json(error)
    }
};