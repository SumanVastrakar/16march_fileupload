const express = require("express");
  
// Import the filesystem module
const fs = require('fs');
  // Get the files in current directory
// before deletion
getFilesInDirectory();
// const fileupload = require("express-fileupload");

// Function to get current filenames
// in directory with specific extension
function getFilesInDirectory() {
  console.log("\nFiles present in directory:");
  let files = fs.readdirSync(__dirname);
  files.forEach(file => {
    console.log(file);
  });
}

// const app = express();

// const path = require("path");
const User = require("../models/user.models.js");
// const Gallery = require("../models/gallery.models")

const router = express.Router();

const uploads = require("../middleware/uploads.js");

// app.use(fileupload());
  
//<------------crud operation for users------------>


    router.get("", async (req, res)=>{
    try{
 let user = await User.find().lean().exec();
 return res.status(201).send(user);

    }catch(err){
        return res.status(500).send({message:err.message})
    }
});


//<-------for posting single file--------------->
router.post("",uploads.single("profilePic"),async(req,res)=>{
    try{
        // console.log(req.body);
        // console.log(req.file);
//         console.log("post of single")
//         console.log(path.join(__dirname,"../my-uploads"));
//    const user = await User.create({
//     first_name:req.body.first_name,
//     last_name:req.body.last_name,
//     // profilePic:req.file.path,
//    });
// //    return res.status(200).send(user);
//         console.log(path.join(__dirname,"../my-uploads"));
        // let user = await User.find().lean().exec();
        // return res.status(201).send("user");
        const user = await User.create({
            first_name: req.body.first_name,
            last_name:req.body.last_name,
            profilePic: req.file.path,  
        });
        return res.status(200).send(user);
       
           }catch(err){
               return res.status(500).send({message:err.message})
           }
});
//updating user
router.patch("/:id",async(req,res)=>{
    try{
        // Delete example_file.txt
fs.unlink("req.file", (err => {
    if (err) console.log(err);
    else {
      console.log("\nDeleted file: example_file.txt");
    
      // Get the files in current directory
      // after deletion
      getFilesInDirectory();
    }
  }));
const users= await User.findByIdAndUpdate(req.params.id,req.body ,{new:true}).lean().exec();
return res.status(200).send(users);
    }
    catch(err){
        return res.status(500).send({message:err.message})
    }
})

//deleting user
router.delete("/:id",async(req,res)=>{
    try{
const users= await User.findByIdAndDelete(req.params.id).lean().exec();


// Delete example_file.txt
fs.unlink("req.file", (err => {
    if (err) console.log(err);
    else {
      console.log("\nDeleted file: example_file.txt");
    
      // Get the files in current directory
      // after deletion
      getFilesInDirectory();
    }
  }));

return res.status(200).send(users);
    }
    catch(err){
        return res.status(500).send({message:err.message})
    }
})
//<------------------for posting multiple file------------->

// router.post("/multiple",uploads.any("profilePic"),async(req,res)=>{
//     try{
//    const filePath = req.files.map((file)=>{
//    return file.path
//      });
//      const user = await User.create({
//         first_name: req.body.first_name,
//         last_name:req.body.last_name,
//         profilePic: filePath,  
//     });
//         // console.log(path.join(__dirname,"../my-uploads"));
//         // let user = await User.find().lean().exec();
//         return res.status(201).send(user);
  
//            }catch(err){
//                return res.status(500).send({message:err.message})
//            }
// });








module.exports = router;