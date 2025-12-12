import express from 'express';
import dotenv from "dotenv";
import cookieParser from 'cookie-parser';
import mongoose from 'mongoose';
import { errorMiddleware } from "./middleware/errorMiddleware.js";
import userRouter from './routers/userRouter.js';

dotenv.config();
const server=express();
server.use(express.json());
server.use(cookieParser());
server.use(userRouter);
server.use(errorMiddleware);

mongoose.connect(process.env.DB_URL).then(()=>{
    server.listen(5000,()=>{
        console.log("server starting at port 5000");
    })
})