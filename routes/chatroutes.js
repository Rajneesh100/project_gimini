const express = require('express')

const router=express.Router()
const { union } = require('lodash');

const {jwtAuthMiddleWare,genrateToken}= require('./../jwt.js');
router.use(express.json());

const Message= require('./../models/message')
const Person= require('./../models/person')



router.get('/chat_history',jwtAuthMiddleWare, async(req,res)=>{
    try{
        const userdata=req.jwtPayload.userData
        console.log("userdata in chat:", userdata);
        const userId= userdata.id;
        const user =await Person.findById(userId)
        if(!user) {
            return res.status(401).json({error:"invalid user"})
        }
        const chat_history = await Message.find({
            $or: [
                { sender: userId },
                { reciever: userId }
            ]
        });
        
        res.send({response:chat_history})
    }catch(err){
        console.log(err);
        res.status(500).json({error:"Internal Server Error"})
    }
})


module.exports=router

