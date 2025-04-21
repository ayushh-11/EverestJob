const mongoose = require("mongoose");

const companySchema = new mongoose.Schema({
    name : String,
    logo : {data: Buffer, type: String },
    email : String,
    password : String,
    description : String,
    specialities : [],
    phone : String,
},{timestamps : true})

const companyModel = new mongoose.model("company", companySchema);

module.exports = companyModel;