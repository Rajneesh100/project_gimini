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
                { sender_id: userId },
                { reciever_id: userId }
            ]
        });
        res.send({response:chat_history})
    }catch(err){
        console.log(err);
        res.status(500).json({error:"Internal Server Error in chat_history"})
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
            sender_id: userId, 
            reciever: data.send_to,
            reciever_id:data.send_to_id,
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





router.post('/get_my_chat_with', jwtAuthMiddleWare, async (req, res) => {
    try {

        const userdata = req.jwtPayload.userData;
        // console.log("userdata in chat:", userdata);
        const username1 = userdata.username;
        const userId1 = userdata.id;  // sender

        const user = await Person.findById(userId1);
        if (!user) {
            return res.status(401).json({ error: "You are an invalid user" });
        }

        const userId2 = req.body.selected_user_id;
        const chat_history = await Message.find({
            $or: [
                { $and: [{ sender_id: userId1 }, { reciever_id: userId2 }] },
                { $and: [{ sender_id: userId2 }, { reciever_id: userId1 }] }
            ]
        });
        
        res.send({response:chat_history})
    } catch (err) {
        console.error("Error saving message:", err);  // Enhanced error logging
        res.status(500).json({ error: "Internal Server Error in get_my_chat_with" });
    }
});









router.get('/get_connection', jwtAuthMiddleWare, async (req, res) => {
    try {
        const userdata = req.jwtPayload.userData;
        const userId = userdata.id;

        const user = await Person.findById(userId);
        if (!user) {
            return res.status(401).json({ error: "Invalid user" });
        }

        // Get sent messages
        const sentMessages = await Message.find({ sender_id: userId })
            .select('reciever reciever_id')
            .exec();

        // Get received messages
        const receivedMessages = await Message.find({ reciever_id: userId })
            .select('sender sender_id')
            .exec();

        // Create an array of pairs (sender, sender_id) and (receiver, receiver_id)
        const sentPairs = sentMessages.map(msg => ({
            name: msg.reciever,
            id: msg.reciever_id
        }));

        const receivedPairs = receivedMessages.map(msg => ({
            name: msg.sender,
            id: msg.sender_id
        }));

        // Combine and deduplicate pairs
        const allPairs = [...sentPairs, ...receivedPairs];
        const uniquePairs = Array.from(new Set(allPairs.map(pair => JSON.stringify(pair))))
            .map(pair => JSON.parse(pair));

        res.send({ response: uniquePairs });

    } catch (err) {
        console.log(err);
        res.status(500).json({ error: "Internal Server Error in get_connection" });
    }
});


























module.exports=router

