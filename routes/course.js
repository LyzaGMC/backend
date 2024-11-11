const express = require("express");
const router = express.Router();
const courseController = require("../controllers/courseController");

// Ajouter un cours à un programme
router.post("/:programId/add", courseController.addCourse);

// Obtenir les cours d'un programme
router.get("/:programId", courseController.getCoursesByProgram);

module.exports = router;
