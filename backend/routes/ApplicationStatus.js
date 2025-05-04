const express = require("express")
const router = express.Router();
const applicationModel = require("../models/Application");
const nodemailer = require("nodemailer");

router.put("/applicationStatus/:id", async (req, res) => {
  const vacancy = req.body.vacancy;
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.email,
      pass: process.env.password  // NOT real Gmail password
    }
  });
  // send mail with defined transport object
  const info = await transporter.sendMail({
    from: "Everest Job",
    to: req.body.email,
    subject: `Job Application Update for ${vacancy.title}`,
    text: `You had applied to the job for post of ${vacancy.title}. Congratulations, you are selected and your renumeration will be ${vacancy.salary}. The location is ${vacancy.location}`,
    html: `<b>You had applied to the job for post of ${vacancy.title}. Congratulations, you are selected and your renumeration will be Rs. ${vacancy.salary}. The location is ${vacancy.location}.</b>`,
  });

  console.log("Mail ====> ", info)
  try {
    const updated = await applicationModel.findByIdAndUpdate(
      req.params.id,
      { status: req.body.status },
      { new: true }
    );

    res.json(updated);
  }
  catch (err) {
    console.error(err);
    res.status(500).json({ error: "Could not update status" });
  }
});

module.exports = router
