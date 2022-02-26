const mysql = require("mysql");

const connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "root",
    database: "groupomania"
  });

// Export de l'objet connection

module.exports = connection;