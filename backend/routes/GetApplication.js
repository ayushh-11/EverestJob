const express = require('express');
const router = express.Router();
const applicationModel = require("../models/Application");
const vacancyModel = require("../models/Vacancy");
const candidateModel = require("../models/Candidate");

router.get("/getApplication/:cid", async (req, res) => {
  const cid = req.params.cid;
  try {
    const applications = await applicationModel.find({ postedBy: cid });

    const enrichedApplications = await Promise.all(
      applications.map(async (app) => {
        const vacancy = await vacancyModel.findById(app.jobId); 
        const user = await candidateModel.findById(app.userId);

        return {
          application: app,
          vacancy,
          user,
        };
      })
    );

    res.json(enrichedApplications);
  } catch (error) {
    console.error("Error fetching applications:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});
module.exports = router