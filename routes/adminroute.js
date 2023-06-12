const express = require("express")
const router = express.Router()
const User = require("../models/usermodel")
const authMiddleware = require("../middleware/authMiddleware")



router.get("/get-all-users",authMiddleware,async(req,res)=>{
    try {
      const users = await User.find({})  
      console.log(users);
      res.status(200)
      .send({message:"users fetched successfully",
      success:true,
      data:users
    })

    }catch(error) {
        return res
        .status(500)
        .send({message:"users not found",success:false})
    }
}),

router.post("/delete-users",async(req,res)=>{
  try {
    const {id} = req.body
      const del = await User.findByIdAndDelete({_id:id})
     const deletedUsers = await User.find({})
      res
      .status(200)
      .send({message:"user successfully deleted",success:true,data:deletedUsers})
  } catch (error) {
    console.log(error);
    res
    .status(500)
    .send({message:"issues in deleting",error})
  }
})


router.post("/edited-info-byadmin",authMiddleware,async(req,res)=>{
    console.log(req.body,"body @admin");
    const {name,email} = req.body.value
    console.log(name,email,"bodtttyyy");
    console.log(req.query.id,"idd");
   const edit = await User.findByIdAndUpdate({_id:req.query.id},
    {   $set:{name:name,email:email} })
    return res
    .status(200)
    .json({message:"updated successfully"}) 
})

module.exports = router;