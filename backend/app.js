// Appel du module Express

const express = require('express');

// Module path

const path = require('path');


// Appel de l'objet connection

const connexion = require("./env")

// Connection à mySQL

connexion.connect((err) => {
  if (err) {
    console.log("Connexion à la base de donnée échouée");
    return
  }
  console.log("Connexion à la base de donnée réussie")
}) 

// Appel du router user

const userRoutes = require('./routes/user');

// Appel du router publication

const publicationRoutes = require("./routes/publication");

// Appel du router comment

const commentRoutes = require("./routes/comment");

// Initialisation de l'app

const app = express();

// Header CORS

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', '*');
    res.setHeader('Access-Control-Allow-Methods', '*');
    next();
  });

app.use(express.json());

// Multer Middleware path setup

app.use("/images", express.static(path.join(__dirname, "images")));

//Utilisation de app.use des routes user

app.use('/api/auth', userRoutes);

// Utilisation app.use des routes publication

app.use("/api/publications", publicationRoutes);

// Utilisation app.use des routes comment

app.use("/api/comments", commentRoutes);

// Export de l'app pour server.js

module.exports = app;


