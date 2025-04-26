const mongoose = require("mongoose");

const vacancySchema = new mongoose.Schema({
    title : String,
    salary : String,
    type : {
        type : String,
        enum : ["job", "internship"]
    },
    expiry : Date,
    postedBy : String,
    description : String,
    location : String,
    companyLogo : String,
    category : String,
    companyName : String
},{timestamps : true})

const vacancyModel = new mongoose.model("vacancy", vacancySchema);

module.exports = vacancyModel;