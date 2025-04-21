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

const upload = multer({ storage })

router.put("/updateUser/:id", upload.single("profile"), async (req, res) => {
    const { name, email, password, phone, bio, skill } = req.body;
    const profileImagePath = req.file ? req.file.path : null;
    const userId = req.params.id;

    var updateData = {
        name,
        email,
        phone,
        bio,
        skill
    }
    try {
        if (password) {
            hashedPassword = await bcrypt.hash(password, 10)
            updateData.password = hashedPassword
        }
        if (profileImagePath) {
            updateData.profile = profileImagePath;
        }

        const updatedUser = await candidateModel.findByIdAndUpdate(userId, updateData, {new : true});
        res.json(updatedUser)

    }
    catch (error) {
        console.log("Error => "+error)
        res.json("error")
    }

})

module.exports = router