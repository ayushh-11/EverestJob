const mongoose = require("mongoose");

const candidateSchema = new mongoose.Schema({
    name : String,
    profile : {data: Buffer, type: String },
    email : String,
    password : String,
    phone : String,
    bio : String,
    skill : [String]
    
},{timestamps : true})

const candidateModel = new mongoose.model("candidate", candidateSchema);
module.exports = candidateModel;