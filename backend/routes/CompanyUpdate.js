const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const multer = require("multer");
const path = require("path");
const companyModel = require("../models/Company");

//Storage Config
const storage = multer.diskStorage({
    destination: (req, file, cb) => cb(null, "uploads/"),
    filename: (req, file, cb) => cb(null, Date.now() + path.extname(file.originalname)),
})

const upload = multer({ storage })

router.put("/updateCompany/:id", upload.single("logo"), async (req, res) => {
    const cid = req.params.id;
    const { name, email, password, description, specialities, phone } = req.body;
    var updateData = {
        name,
        email,
        phone,
        description,
        specialities
    }
    const ress = companyModel.findOne({ email })
    if (ress.length > 1)
        res.json("exist")
    else {
        const logoPath = req.file ? req.file.path : "";
        if (password) {
            hashedPassword = await bcrypt.hash(password, 10)
            updateData.password = hashedPassword;
        }
        if (logoPath) {
            updateData.logo = logoPath;
        }
        console.log(updateData)
        companyModel.findByIdAndUpdate(cid, updateData, { new: true })
            .then(result => {
                if (result)
                    res.json(result);
            })
            .catch(error => res.json(
                "error"
            ))
    }

})

module.exports = router;