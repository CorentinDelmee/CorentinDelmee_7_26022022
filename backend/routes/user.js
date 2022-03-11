// Appel du module Express
const express = require("express");

// Appel de la fonction Router de express
const router = express.Router();

// Appel de User Controller 
const userCtrl = require("../controllers/user");
const auth = require('../middleware/auth');

// Routes post inscription
router.post("/signup", userCtrl.signup);

// Routes post connexion
router.post("/login", userCtrl.login);

// Routes put modifier nom
router.put("/name/:id",  auth, userCtrl.modifyName);

// Routes put modifier prenom
router.put("/surname/:id",  auth, userCtrl.modifySurname);

// Routes delete user
router.delete("/:id",  auth, userCtrl.deleteUser);

// Export du router pour user.js

module.exports = router;