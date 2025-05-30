const express = require("express");
const candidateModel = require("../models/Candidate");
const vacancyModel = require("../models/Vacancy")
const router = express.Router();

router.get("/index",async (req, res) => {
    vacancyModel.find({})
    .then(result => {
        if(result)
            res.json(result)
    })
    .catch(error => {
        if(error)
            res.json("error")
    })
})

module.exports = router;