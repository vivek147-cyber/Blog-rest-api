import express from "express";
import { createcategory,getcategory} from "../controllers/category.js";

const router = express.Router();

router.post("/createcategory", createcategory);

router.get("/getcategory", getcategory);


export default router;