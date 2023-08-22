import express from "express";
import { register,login,logout,getMyProfile,updateMyProfile } from "../controllers/user.js";

const router = express.Router();

router.post("/register", register);

router.post("/login", login);

router.get("/logout", logout);

router.get("/me", getMyProfile);

router.put("/:id", updateMyProfile);


export default router;