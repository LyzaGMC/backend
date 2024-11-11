const express = require("express");
const router = express.Router();
const programController = require("../controllers/programController");

// Route to create a new program
router.post("/", programController.createProgram);

module.exports = router;
