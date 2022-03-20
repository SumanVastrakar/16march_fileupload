const express = require("express");
// const fileupload = require("express-fileupload");

// const app = express();

// const path = require("path");
// const User = require("../models/user.models.js");
const Gallery = require("../models/gallery.models.js")

const router = express.Router();

const uploads = require("../middleware/uploads.js");

// app.use(fileupload());
  
//<------------crud operation for users------------>


    router.get("", async (req, res)=>{
    try{
 
 let user = await Gallery.find()
 .populate({
  
    path: "userId", select: { first_name: 1, last_name: 1 ,_id:0} 
})
 .lean().exec();
 return res.status(201).send(user);


    }catch(err){
        return res.status(500).send({message:err.message})
    }
});




//<------------------for posting multiple file------------->

router.post("",uploads.any("profilePic"),async(req,res)=>{
    try{
   const filePath = req.files.map((file)=>{
   return file.path
     });
     const user = await Gallery.create({
         userId:req.body.userId,
        // first_name: req.body.first_name,
        // last_name:req.body.last_name,
        profilePic: filePath,  
    });
        // console.log(path.join(__dirname,"../my-uploads"));
        // let user = await User.find().lean().exec();
        return res.status(201).send(user);
  
           }catch(err){
               return res.status(500).send({message:err.message})
           }
});








module.exports = router;