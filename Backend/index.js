import express from "express";
import env from "dotenv";
import cors from "cors";
import { connectDB } from "./database/connectDB.js";
import { userRoutes } from "./routes/userRoutes.js";
import { errorHandler } from "./middlewares/errorHandler.js";
import * as socketIo from "socket.io";


env.config();
const app = express();

app.use(cors({origin:"*"}))
app.use(express.json({limit:"100mb"}));
app.use(express.urlencoded({ extended: true, limit:"100mb"}));
app.use("/users", userRoutes)
app.use(errorHandler)
connectDB()


const server = app.listen(12000, ()=>{
    
    console.log("app is listening at port 12000");
})

let io = new socketIo.Server(server, {
  cors:{
      origin:"*"
  }
});


io.on("connection", (socket)=>{
  console.log("New user connected");
  console.log(`User ${socket.id} is connected`);

  socket.on("message", (data)=>{
      console.log(data, socket.id);
      io.emit("broadcast", data);
  })

  socket.on("disconnect", ()=>{
      console.log(`User ${socket.id} has disconnected`)
  })
}) 