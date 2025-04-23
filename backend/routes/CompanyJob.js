const express = require("express");

const vacancyModel = require("../models/Vacancy")
const router = express.Router();

router.get("/companyJob/:cid",async (req, res) => {
    vacancyModel.find({
        postedBy : req.params.cid
    })
    .then(result => {
        if(result){
            console.log(req.params.cid)
            console.log(result)
            res.json(result)
        }
    })
    .catch(error => {
        if(error)
            res.json("error")
    })
})

module.exports = router;