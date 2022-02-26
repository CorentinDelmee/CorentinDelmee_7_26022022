const mysql = require("mysql");

const connexion = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "root",
    database: "groupomania"
  });

// Export de l'objet connection

module.exports = connexion;