// Appel du module Express
const express = require("express");

// Appel de la fonction Router de express
const router = express.Router();

// Appel de User Controller 
const userCtrl = require("../controllers/user");

// Routes post inscription
router.post("/signup", userCtrl.signup);

// Routes post connexion
router.post("/login", userCtrl.login);

// Routes post connexion
router.put("/name/:id", userCtrl.modifyName);

// Routes post connexion
router.put("/surname/:id", userCtrl.modifySurname);

// Routes post connexion
router.delete("/:id", userCtrl.deleteUser);

// Export du router pour user.js

module.exports = router;