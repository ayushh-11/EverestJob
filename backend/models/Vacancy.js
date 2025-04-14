const mongoose = require("mongoose");

const vacancySchema = new mongoose.Schema({
    title : String,
    salary : String,
    type : {
        type : String,
        enum : ["job", "internship"]
    },
    expiry : Date,
    postedBy : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "company",
        required : true
    },
    selectedStatus : {
        type : Boolean,
        default : false
    }
},{timestamps : true})

const vacancyModel = new mongoose.model("vacancy", vacancySchema);

module.exports = vacancyModel;