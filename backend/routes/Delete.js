const express = require('express');
const router = express.Router();
const vacancyModel = require('../models/Vacancy');
const applicationModel = require("../models/Application")

router.delete("/delete/:vid", async (req, res) => {
    const vid = req.params.vid;
    try {
        await vacancyModel.deleteOne({
            _id: vid
        })
        await applicationModel.deleteMany({
            jobId : vid,
        })
        res.json("success")
    }
    catch (error) {
        res.json("error")
    }
})

module.exports = router