const express = require("express")
const User = require("../models/usermodel")
const router = express.Router()
const bcrypt = require('bcryptjs')
const jwt = require("jsonwebtoken")
const authMiddleware = require("../middleware/authMiddleware")

//signup
router.post("/register",async(req,res)=>{
    try {
        const userExists = await User.findOne({email:req.body.email})
//checking if the user is existing or not
        if(userExists){
            return res
            .status(200).
            send({message:"user already exists",success:false })
        }

            const password = req.body.password
            console.log(password,"this is the password");
            const salt = await bcrypt.genSalt(10); 
            const hashedPassword = await bcrypt.hash(password,salt)
            req.body.password = hashedPassword
            const newUser = new User(req.body)
            console.log(newUser,"this is the new user");

        await newUser.save()
        res
        .status(200)
        .send({message:"user created successfully", success: true})
    } catch (error) {
        res
        .status(500)
        .send({message:"user is not available",success:false})
    }
})

//login
router.post("/login",async(req,res)=>{
    try {
        const user = await User.findOne({email:req.body.email})
        if(!user){
            return res
            .status(500)
            .send({message:"the user is not available",success:false})
        }
        const isMatch = await bcrypt.compare(req.body.password,user.password)
        if(!isMatch){
             res
            .status(200)
            .send({message:"the email or password is incorrect",success:false})
        }else{
            const token = jwt.sign({id:user._id},process.env.JWT_SECRET,{
                expiresIn:'1d'
            })
            res 
            .status(200)
            .send({
                message:"login successful",success:true,data:token
            })
        }
    } catch (error) {
        console.log(error,"login error");
        return res
        .status(500)
        .send({message:"login unsuccessful",success:false,error})
    }
})

//creating endpoints to keep the user logged in
router.post('/get-user-info-by-id',authMiddleware, async(req,res)=>{
    try {
        const user = await User.findOne({_id : req.body.userId})
        if(!user){
            return res
            .status(200)
            .send({message:"user does not exist",success:false})
        }else{
            res
            .status(200)
            .send({success:true,data:{
                name:user.name,
                email:user.email
            }})
        }
    } catch (error) {
        res.status(500)
        .send({message:"error in getting info",success:false,error})
    }
})

module.exports = router;