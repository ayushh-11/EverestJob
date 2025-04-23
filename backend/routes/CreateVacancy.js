const express = require("express");
const router = express.Router();
const vacancyModel = require("../models/Vacancy")
router.post("/createVacancy", async (req, res) => {
    console.log(req.body)
    await vacancyModel.create(req.body)
    .then(result => {
        if(result)
            res.json("success");
        else
            res.json("error")
    })
})
module.exports = router;