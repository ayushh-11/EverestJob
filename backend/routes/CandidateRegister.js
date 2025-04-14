const candidateModel = require("../models/Candidate");
const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const multer = require("multer");
const path = require("path");

//Storage Config
const storage = multer.diskStorage({
    destination: (req, file, cb) => cb(null, "uploads/"),
    filename: (req, file, cb) => cb(null, Date.now() + path.extname(file.originalname)),
})

const upload = multer({storage})

router.post("/createUser", upload.single("profile"), (req, res) => {
    const {name, email, password, phone, bio, skill } = req.body;
    const profileImagePath = req.file ? req.file.path : "";
    bcrypt.hash(password, 10, (hashError, hash) => {
        if (hashError)
            res.json({"hashError" : hashError});
        
        candidateModel.create({
            name,
            profile : profileImagePath,
            email,
            password : hash,
            phone,
            bio,
            skill
        })
        .then(result => {
            res.json({"success" : result});
        })
        .catch(error => res.json(
            {"error" : error}
        ))
    })
})

module.exports = router;