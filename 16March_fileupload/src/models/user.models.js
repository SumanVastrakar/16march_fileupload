const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    first_name : {type:String, required: true},
    last_name :{type:String, required: true},
    profilePic :[{type:String , required :false}]
},{
    versionKey: false,
    timestamps: true,
});

module.exports = mongoose.model("user",userSchema);

// //gallery model 

// const gallerySchema = new mongoose.Schema({
//  userId:{type : mongoose.Schema.Types.ObjectId, ref : "users", required : true}
// },{
//     versionKey: false,
//     timestamps: true,
// });

// module.exports = mongoose.model("gallery",gallerySchema);
