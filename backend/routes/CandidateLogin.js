const candidateModel = require("../models/Candidate");
const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");

router.post("/loginUser", (req, res) => {
    const {email, password} = req.body;
    candidateModel.findOne({email})
    .then (result => {
        if (result) {
            bcrypt.compare(password, result.password, (passwordError, passwordResult) => {
                if (passwordResult){
                    req.session.userId = result._id;
                    res.json("success")
                }
                else
                    res.json("error")
            })
        }
        else
            res.json("error")
    })
})

module.exports = router