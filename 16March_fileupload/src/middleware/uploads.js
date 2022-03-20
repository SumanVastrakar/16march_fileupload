//just like express cannot be ab;le to json files similary it cannot ab=lso able to rfead multipart files hence to mmake it readable we are using middleware that will read multi part files for us.

const path = require("path");

const multer  = require('multer')

// const req= require("express/lib/request")
// console.log(__dirname)

const storage = multer.diskStorage({

  destination: function (req, file, callback) {
//just by hovering over the callback we get to know that it is taking 2 values 1--->error and 2-->destination, we are taking error as null and desination we are providing path for that.
    callback(null,path.join(__dirname,"../my-uploads") );

    //The path.join() method is used to join a number of path-segments using the platform-specific delimiter to form a single path. The final path is normalized after the joining takes place.
    //What does __ Dirname do?
//The __dirname in a node script returns the path of the folder where the current JavaScript file resides.
  },
  filename: function (req, file, callback) {
    const uniquePrefix = Date.now();
    callback(null, uniquePrefix + "-" + file.originalname);
  },
  //we are not taking suffix because we do not want resume.png-123456789 because its extebnsion getr changed 
  // but by using prefix we can getr 12334556-resumne.png and this is the correct thing which we needed. 
});

const fileFilter =(req, file,callback) =>{
console.log({file});
console.log("upload page is running")

  // The function should call `cb` with a boolean
  // to indicate if the file should be accepted

  // To reject this file pass `false`, like so:
  if(file.mimetype==="image/jpeg"||file.mimetype==="image/png") //it means that the file can be accepted if the file is in this format.
 callback(null, true);

  // To accept the file pass `true`, like so:
  else 
 callback(null, false);
};

const options = {

  storage:storage,
  fileFilter:fileFilter,
  limits:{
    fileSize:1024*1024*10,
  },
} ;

const uploads = multer(options);
// console.log(uploads)
module.exports = uploads;
