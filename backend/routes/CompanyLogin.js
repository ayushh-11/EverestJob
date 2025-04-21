const candidateModel = require("../models/Candidate");
const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const companyModel = require("../models/Company");

router.post("/loginCompany", (req, res) => {
    const {email, password} = req.body;
    companyModel.findOne({email})
    .then (result => {
        if (result) {
            bcrypt.compare(password, result.password, (passwordError, passwordResult) => {
                if (passwordResult){
                    req.session.userId = result._id;
                    res.json(result)
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