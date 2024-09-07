const express = require('express')

const router=express.Router()
const { GoogleGenerativeAI } = require("@google/generative-ai");
require('dotenv').config();
const { union } = require('lodash');

const {jwtAuthMiddleWare,genrateToken}= require('./../jwt.js');

router.use(express.json());

const Message= require('./../models/message')
const Person= require('./../models/person')


const loadFetch = async () => {
    const fetchModule = await import('node-fetch');
    return fetchModule.default;
};

const generate = async (prompt) => {
    try {
        const fetch = await loadFetch();
        const genAI = new GoogleGenerativeAI(process.env.API_KEY, { fetch });
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

        // const prompt = "how burnauli principle works on mac1 ? explaim with diagram";
        const result = await model.generateContent(prompt);
        // console.log(result.response.text());
        // console.log(result.response);

        return result.response.text()
       
    } catch (error) {
        console.log(error);
    }
};


// const prompt = "how burnauli principle works on mac1 ? explaim with diagram";
      
// generate(prompt);


router.post('/chat_with_mira',jwtAuthMiddleWare, async(req,res)=>{
    try{
        const userdata=req.jwtPayload.userData
        // console.log("userdata in chat:", userdata);
        const userId= userdata.id;
        const user =await Person.findById(userId)
        if(!user) {
            return res.status(401).json({error:"invalid user"})
        }
        const username= userdata.username;
        
        const prompt =req.body.query;
        const recieved ={
            text:prompt,
            sender:username,
            reciever:"gemini",
            timestamp: new Date()
        }
        const recievedMessage = new Message(recieved)
        const savedrecieved = await recievedMessage.save()

        const response =await generate(prompt)

        const  sent ={
            text:response,
            sender:"gemini",
            reciever:username,
            timestamp: new Date()
        }

        const sentMessage = new Message(sent)
        const savedsent = await sentMessage.save()
        
        
        res.send({response:response})
    }catch(err){
        console.log(err);
        res.status(500).json({error:"Internal Server Error"})
    }
})


module.exports=router

