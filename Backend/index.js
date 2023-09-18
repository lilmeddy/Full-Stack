import express from "express";
import env from "dotenv";
import cors from "cors"
import {connectDB} from "./database/connectDB.js";
import { userRoutes } from "./routes/userRoutes.js";
import { errorHandler } from "./middlewares/errorHandler.js";

env.config();
const app = express();

app.use(cors({origin:"*"}))
app.use(express.json({limit:"100mb"}));
app.use(express.urlencoded({ extended: true, limit:"100mb"}));
app.use("/users", userRoutes)
app.use(errorHandler)
connectDB()
app.listen(12000, ()=>{
    
    console.log("app is listening at port 12000");
})