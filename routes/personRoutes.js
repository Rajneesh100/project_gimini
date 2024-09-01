const express = require('express')
const router=express.Router()
router.use(express.json());
const Person =require('./../models/person')
const {jwtAuthMiddleWare,genrateToken}= require('./../jwt.js');

// const prompt = "how burnauli principle works on mac1 ? explaim with diagram";
// generate(prompt);




router.post('/signup', async(req,res)=>{
    try{
        const payload = req.body;
        const newUser= new Person(payload)
        const response = await newUser.save();
        // console.log(response)
        const userdata ={
            id:response.id,
            username: response.username,
            email:response.email
        }
        const token =genrateToken(userdata);
        res.status(200).json({response:response, message:"User created sucessfully",token:token})

    }catch(error)
    {
        console.log("error in signup [routes/personroutes]:",error);
        res.status(500).json({error:"ETERNAL Server error :("})
    }
})



router.post('/login', async(req,res)=>{
    try{
        const payload = req.body;
        const user = await Person.findOne({username:payload.username})
        // console.log(payload);
        if(!user||!(await user.comparePassword(payload.password))){
            return res.status(401).json({error:"Invalid Username or Password :("})
        }
        
        const userdata ={
            id:user.id,
            username: user.username,
            email:user.email
        }
        const token =genrateToken(userdata);

        res.status(200).json({userdata:userdata, message: "Welcome back !", token:token});

    }catch(error)
    {
        console.log("error in login [routes/personroutes]:",error);
        res.status(500).json({error:"ETERNAL Server error :("})
    }
})


router.get('/profile', jwtAuthMiddleWare,async function(req,res){
    try{
        const userData =req.jwtPayload.userData;
        // console.log("userData :",userData);
        const userId=userData.id;
        const user= await Person.findById(userId)
        res.status(200).json(user)

    }catch(error)
    {
        console.log("error in fetching profile [routes/personroutes]:",error);
        res.status(500).json({error:"ETERNAL Server error :("})
    }
    
})




module.exports=router

