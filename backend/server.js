import express from 'express'   // ->  in package.json, add "type":"module"
//const express = require("express")
import cors from "cors"
import dotenv from "dotenv"

 import notesRoutes from "./routes/notesRoutes.js"
//const notesRoutes = require("./routes/notesRoutes");
import {connectDB} from "./config/db.js" 
import rateLimiter from "./middleware/rateLimiter.js";

//dotenv.config();

//console.log(process.env.MONGO_URI);

const app = express()
const PORT = process.env.PORT || 5001
//connectDB();

//middleware
app.use(cors({              //allows every request from any url unless spcified
    origin:"http://localhost:5173"
})); 
app.use(express.json());     // this middleware will parse JSON bodies : req.body

app.use(rateLimiter);  
 


//our simple custom middleware
// app.use((req, res,next) => {
//     console.log(`Request method is${req.method} & Request URL is ${req.url}`);
//     next();
// });


app.use("/api/notes", notesRoutes)

connectDB().then(() => {
app.listen(PORT, () => {
    console.log("Server started at PORT:", PORT);
    
})
})



//Rate Limiting -> Way to control how often someone can do something 
// on a website or an app (like hpow many times they can refresh a page, make s request to
// to an API or try to log in).

// Prevents abuse.