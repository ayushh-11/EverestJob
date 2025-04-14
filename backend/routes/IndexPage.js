const express = require("express");
const candidateModel = require("../models/Candidate");
const router = express.Router();

router.get("/index",async (req, res) => {
    const uid = req.session.userId;
    const user = await candidateModel.findOne({
        _id : "67fa3dccf4753a8069b98b53"
    })
    if(user){
        console.log(user)
        res.json(user);
    }
    else
        res.json("data error")
})

module.exports = router;