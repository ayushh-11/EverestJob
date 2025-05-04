const express = require('express');
const router = express.Router();
const applicationModel = require("../models/Application");
const vacancyModel = require("../models/Vacancy");

router.get("/getUserApplication/:cid", async (req, res) => {

    const cid = req.params.cid;
    try {
        const applications = await applicationModel.find({ userId: cid });
        console.log(applications)
        const enrichedApplications = await Promise.all(
            applications.map(async (app) => {
                const vacancy = await vacancyModel.findById(app.jobId);
                return {
                    application: app,
                    vacancy,
                }
            })
        )
        res.json(enrichedApplications);
    } catch (error) {
        console.error("Error fetching applications:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});
module.exports = router