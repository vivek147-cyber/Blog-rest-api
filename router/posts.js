import express from "express";
import { createBlog,getBlog,getallBlog,updateBlog,deleteBlog } from "../controllers/post.js";

const router = express.Router();

router.post("/createblog", createBlog);

router.put("/update/:id", updateBlog);

router.delete("/delete/:id", deleteBlog);

router.get("/getblog/:id", getBlog);

router.get("/getallblogs", getallBlog);


export default router;