const mongoose = require('mongoose');
const connection = async () => {
    try{
       
        await mongoose.connect(process.env.url);
        console.log("Database connected");
    }
    catch(error){
        console.log("Database Error" + error);
    }
}

module.exports = connection;