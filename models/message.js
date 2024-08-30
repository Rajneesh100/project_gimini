const { union } = require('lodash');
const mongoose =require('mongoose')


const messageSchema  = new mongoose.Schema({
    text:{
        type: String,
        required: true
    },
    sender:{
        type: String,
        required: true
    },
    reciever:{
        type: String,
        required: true
    },
    timestamp:{
        type: Date,
        required:true
    }
})

const Message =mongoose.model('Message',messageSchema,'messages')
module.exports=Message;