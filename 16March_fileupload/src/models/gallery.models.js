const mongoose = require("mongoose");


//gallery model 

const gallerySchema = new mongoose.Schema({
 userId:{type : mongoose.Schema.Types.ObjectId, ref : "user", required : true},
 profilePic :[{type:String , required :false}]
},{
    versionKey: false,
    timestamps: true,
});

module.exports = mongoose.model("gallery",gallerySchema);
