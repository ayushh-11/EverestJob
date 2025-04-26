const express = require('express');
const router = express.Router();
const applicationModel = require('../models/Application');
const multer = require("multer");
const path = require("path");

//Storage Config
const storage = multer.diskStorage({
    destination: (req, file, cb) => cb(null, "uploads/"),
    filename: (req, file, cb) => cb(null, Date.now() + path.extname(file.originalname)),
})

const upload = multer({ storage })

router.post("/apply", upload.single("cv"), async (req, res) => {
    try {
        const { jobId, userId, postedBy } = req.body;
        const cvPath = req.file.path;
        const application = new applicationModel({
            jobId,
            userId,
            cv: cvPath,
            postedBy
        });

        await application.save();
        res.status(201).json("success");
    } catch (error) {
        console.error("Error submitting application:", error);
        res.status(500).json({ message: "Failed to submit CV" });
    }
});

module.exports = router;
