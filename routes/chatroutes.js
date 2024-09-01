const express = require('express')

const router=express.Router()
const { union } = require('lodash');

const {jwtAuthMiddleWare,genrateToken}= require('./../jwt.js');
router.use(express.json());

const Message= require('./../models/message')
const Person= require('./../models/person')


// it very raw form of chat data for any user currently when only user and ai are talking it's fine but when we will introduce person to person and group chat it 
// will become mess of data  
router.get('/chat_history',jwtAuthMiddleWare, async(req,res)=>{
    try{
        const userdata=req.jwtPayload.userData
        // console.log("userdata in chat:", userdata);
        const username= userdata.username;
        const userId=userdata.id
        const user =await Person.findById(userId)
        if(!user) {
            return res.status(401).json({error:"invalid user"})
        }
        const chat_history = await Message.find({
            $or: [
                { sender: username },
                { reciever: username }
            ]
        });
        res.send({response:chat_history})
    }catch(err){
        console.log(err);
        res.status(500).json({error:"Internal Server Error in chat_history"})
    }
})



router.get('/get_connection',jwtAuthMiddleWare, async(req,res)=>{
    try{
        const userdata=req.jwtPayload.userData
        // console.log("userdata in chat:", userdata);
        const username= userdata.username;
        const userId=userdata.id;
        const user =await Person.findById(userId)
        if(!user) {
            return res.status(401).json({error:"invalid user"})
        }
        // Get all unique users who have either sent or received a message involving the given username
        const sentMessages = await Message.distinct('reciever', { sender: username });
        const receivedMessages = await Message.distinct('sender', { reciever: username });

        // Combine the two lists and remove duplicates
        const uniqueUsers = [...new Set([...sentMessages, ...receivedMessages])];

        res.send({ response: uniqueUsers });


    }catch(err){
        console.log(err);
        res.status(500).json({error:"Internal Server Error in get_connection"})
    }
})


router.post('/send', jwtAuthMiddleWare, async (req, res) => {
    try {
        const userdata = req.jwtPayload.userData;
        // console.log("userdata in chat:", userdata);
        const username = userdata.username;
        const userId = userdata.id;  // sender

        const user = await Person.findById(userId);
        if (!user) {
            return res.status(401).json({ error: "You are an invalid user" });
        }

        const data = req.body;
        const recieved = {
            text: data.message_txt,
            sender: username,
            reciever: data.send_to,
            timestamp: new Date()
        };

        const recievedMessage = new Message(recieved);
        const savedrecieved = await recievedMessage.save();
        
        res.status(200).json({savedMessage:savedrecieved, status:"message saved in db"});  // Fixed syntax error here

    } catch (err) {
        console.error("Error saving message:", err);  // Enhanced error logging
        res.status(500).json({ error: "Internal Server Error in send ,Saving the message" });
    }
});




router.get('/get_my_chat_with', jwtAuthMiddleWare, async (req, res) => {
    try {

        const userdata = req.jwtPayload.userData;
        // console.log("userdata in chat:", userdata);
        const username1 = userdata.username;
        const userId = userdata.id;  // sender

        const user = await Person.findById(userId);
        if (!user) {
            return res.status(401).json({ error: "You are an invalid user" });
        }

        const username2 = req.body.selected_user;
        const chat_history = await Message.find({
            $or: [
                { $and: [{ sender: username1 }, { reciever: username2 }] },
                { $and: [{ sender: username2 }, { reciever: username1 }] }
            ]
        });
        
        res.send({response:chat_history})
    } catch (err) {
        console.error("Error saving message:", err);  // Enhanced error logging
        res.status(500).json({ error: "Internal Server Error in get_my_chat_with" });
    }
});














module.exports=router

