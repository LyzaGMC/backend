// routes/levelRoute.js

const express = require("express");
const router = express.Router();

router.post("/api/level", (req, res) => {
  const { level } = req.body;
  if (!level) {
    return res
      .status(400)
      .json({ message: "Veuillez sélectionner un niveau." });
  }
  res.status(200).json({ message: `Votre niveau est : ${level}` });
});

module.exports = router;
