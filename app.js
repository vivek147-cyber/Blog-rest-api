import express from "express";
import dotenv from "dotenv";
import UserRoute from "./router/auth.js";
import PostRoute from "./router/posts.js";
import CategoryRoute from "./router/categories.js";
import cookieParser from "cookie-parser";
import multer from "multer";
import cors from "cors";



const app = express();
export default app;

dotenv.config({
    path: "./config/config.env",
})


const storage = multer.diskStorage({
    destination: (req, file, callb) => {
      callb(null, "images")
    },
    filename: (req, file, callb) => {
       // for local check postman
      //callb(null, "file.png")  
      callb(null, req.body.name)
    },
  })
  const upload = multer({ storage: storage })
  app.post("/upload", upload.single("file"), (req, res) => {
    res.status(200).json("File has been uploaded")
  })

// middlewares
app.use(express.json())
app.use(cookieParser())

app.use(
    cors({
      origin: [process.env.FRONTEND_URL],
      methods: ["GET", "POST", "PUT", "DELETE"],
      credentials: true,
    })
  );

app.use("/api/v1/",UserRoute);
app.use("/api/v1/",PostRoute);
app.use("/api/v1/",CategoryRoute);

app.get("/", (req, res) => {
    res.send("Nice working");
  });
  

