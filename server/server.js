import cors from "cors";
import express from "express";
import { MongoMemoryServer } from "mongodb-memory-server";
import mongoose from "mongoose";
import morgan from "morgan";

const app = express();

// server port 
const port = 8000;

// database connection 
const mongodb = await MongoMemoryServer.create()
const getUri = mongodb.getUri()

mongoose.connect(getUri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(()=> console.log('Database connection successful'))
.catch((err)=> console.log(err))

// middleware
app.use(morgan("tiny"))
app.use(express.json())
app.use(cors())
app.disable("x-powered-by")


// home get req 
app.get("/" , (req, res)=>{
    res.status(201).json("home get request")
})

/** start server only when we have valid connection */
app.listen(port, ()=>{
    console.log(`server running on ${port} port`);
})