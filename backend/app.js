// Appel du module Express

const express = require('express');

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

// Initialisation de l'app

const app = express();
app.use(express.json());

// Header CORS

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
  });


//Utilisation de app.use des routes user

app.use('/api/auth', userRoutes);

// Utilisation app.use des routes stuff

app.use("/api/publications", publicationRoutes);

// Export de l'app pour server.js

module.exports = app;


