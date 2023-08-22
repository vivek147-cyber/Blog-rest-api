import express from "express";
import { Category } from "../models/category.js";


export const createcategory = async(req,res)=>{
    
    const {token} = req.cookies;
    
    if(!token)
     return res.status(404).json({
             success : false,
             message : "Login First",   
    })

    const newcat = new Category(req.body);
    try {
       const savecat = await newcat.save();
       res.status(200).json(savecat);
    } catch (error) {
        res.status(500).json(error);
    }
};


export const getcategory = async(req,res)=>{
    const {token} = req.cookies;
    
    if(!token)
     return res.status(404).json({
             success : false,
             message : "Login First",   
    })

    try {
       const cat = await Category.find();
       res.status(200).json(cat);
    } catch (error) {
        res.status(500).json(error);
    }

};



