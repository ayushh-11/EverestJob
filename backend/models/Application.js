const mongoose = require("mongoose");

const applicationSchema = new mongoose.Schema({
    jobId : String,
    userId : String,
    cv : String,
    postedBy : String,
    status : {
        type : Boolean,
        default : false
    }
},{timestamps : true});

const applicationModel = new mongoose.model("application" , applicationSchema);

module.exports = applicationModel;