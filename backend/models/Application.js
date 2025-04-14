const mongoose = require("mongoose");

const applicationSchema = new mongoose.Schema({
    vacancyId : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "vacancy"
    },
    appliedBy : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "candidate"
    }
},{timestamps : true});

const applicationModel = new mongoose.model("application" , applicationSchema);

modeule.exports = applicationModel;