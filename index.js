import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import morgan from "morgan";
import dotenv from "dotenv";
import userRouter from "./routers/Auth.js";

const app = express();
app.use(morgan("dev"));
app.use(express.json({ limit: "30mb", extended: true }));
app.use(express.urlencoded({ limit: "30mb", extended: true }));
dotenv.config();

app.use(cors());

app.use("/auth", userRouter); 

app.get("/",(req,res)=>{
    res.json({message:"Hello"})
})

const port = 5000;

mongoose
.connect(process.env.MONGODB_URL)
.then(() => {
app.listen(port, () => console.log(`Server running on port ${port}`));
}) 
.catch((error) => console.log(`${error} did not connect`));
