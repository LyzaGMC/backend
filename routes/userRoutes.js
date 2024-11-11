const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");

// Inscription d'un utilisateur
router.post("/signup", userController.signup);

router.post("/form", userController.formContact);

// Connexion d'un utilisateur
router.post("/login", userController.login);



//déconnexion d'un utilisateur


// Enrôler un utilisateur dans un programme
router.post("/enroll/:programId", userController.enrollProgram);

module.exports = router;
