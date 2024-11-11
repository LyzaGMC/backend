const express = require("express");
const router = express.Router();
const programController = require("../controllers/programController");

// Créer un programme
router.post("/create", programController.createProgram);

// Obtenir tous les programmes
router.get("/", programController.getAllPrograms);

// Obtenir un programme spécifique
router.get("/:id", programController.getProgramById);

// Mettre à jour un programme
router.put("/:id", programController.updateProgram);

module.exports = router;
