
require('dotenv').config();
const express = require('express')
const app = express();
app.use(express.json());
const db= require('./db')
const PORT= process.env.PORT




app.get('/', (req,res)=>{
    // res.status(200).json({message:"Welcome"})
    res.send("welcome to Gemini")
})

const geminiRoutes = require('./routes/geminiRoutes')
app.use('/', geminiRoutes)

const personRoutes= require('./routes/personRoutes')
app.use('/', personRoutes)

const chatRoutes= require('./routes/chatroutes')
app.use('/', chatRoutes)

app.listen(PORT,()=>{console.log("Server listing on port 3000")})