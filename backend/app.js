// Appel du module Express

const express = require('express');

// Appel de l'objet connection

const connection = require("./env")

// Connection à mySQL

connection.connect((err) => {
  if (err) {
    console.log("Connexion à la base de donnée échouée");
    return
  }
  console.log("Connexion à la base de donnée réussie")
})
 
/*connection.query('SHOW TABLES FROM groupomania;', function (error, results, fields) {
  if (error) throw error;
  console.log(results);
});*/

// Appel du router user

const userRoutes = require('./routes/user');

// Appel du router stuff

const stuffRoutes = require("./routes/stuff");
const { connect } = require('./routes/user');

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


// Utilisation de app.use des routes user

app.use('/api/auth', userRoutes);

// Utilisation app.use des routes stuff

app.use("/api/sauces", stuffRoutes);


// Export de l'app pour server.js

module.exports = app;


