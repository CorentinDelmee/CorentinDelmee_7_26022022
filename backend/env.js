const mysql = require("mysql");

const connexion = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "Votre mot de passe",
    database: "groupomania"
  });

// Export de l'objet connection

module.exports = connexion;