const express = require("express")
const router = express.Router();
const applicationModel = require("../models/Application");

router.put("/applicationStatus/:id", async (req, res) => {
    try {
      const updated = await applicationModel.findByIdAndUpdate(
        req.params.id,
        { status: req.body.status },
        { new: true }
      );
      res.json(updated);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Could not update status" });
    }
  });

module.exports = router
  