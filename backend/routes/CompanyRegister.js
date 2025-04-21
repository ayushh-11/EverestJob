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

router.post("/createCompany", upload.single("logo"), (req, res) => {
    const { name, email, password, description, specialities, phone } = req.body;
    companyModel.findOne({ email })
        .then(ress => {
            if (ress)
                res.json("exist")
            else {
                const logoPath = req.file ? req.file.path : "";
                bcrypt.hash(password, 10, (hashError, hash) => {
                    if (hashError)
                        res.json("error");

                    companyModel.create({
                        name,
                        logo: logoPath,
                        email,
                        password: hash,
                        description,
                        specialities,
                        phone
                    })
                        .then(result => {
                            if (result)
                                res.json("success");
                        })
                        .catch(error => res.json(
                            "error"
                        ))
                })
            }
        })

})

module.exports = router;