// Appel de connexion mysql

const connexion = require("../env")

// Appel du package bcrypt

const bcrypt = require("bcrypt");

// Appel du package jsonwebtoken (TOKEN)

const jwt = require('jsonwebtoken');

// Importation package node ("file system")

const fs = require("fs");

// Appel du model User

const User = require("../models/User");

// Logique métier : User Inscription

exports.signup = (req, response, next) => {
  bcrypt.hash(req.body.passwordhash, 10)
    .then(hash => {
      let filename = `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
      let user = new User(req.body.nom, req.body.prenom, req.body.email, hash, req.body.role, filename);
      let sql = "INSERT INTO utilisateur SET ?"
      connexion.query(sql, user, (err, res) => {
        if(err) throw err;
      console.log(res);
      console.log("Utilisateur crée");
      response.status(200).json({message: "Utilisateur crée"})
      }) 
    })
    .catch(error => response.status(500).json({ error : "Problème serveur"}));
};

// Logique métier : User Connexion

exports.login = (req,response, next) => {
  let user_email = req.body.email;
  let sql = "SELECT * FROM utilisateur WHERE email = ?"; /*passwordhash*/
  connexion.query(sql, user_email, (err, res) => {
    result = (JSON.parse(JSON.stringify(res)))

    const isEmpty = Object.keys(res).length === 0;
    if(isEmpty) {
      return response.status(401).json({ error : "L'utilisateur n'a pas été trouvé" })
    }
    if(!isEmpty) {
      bcrypt.compare(req.body.password, result[0].passwordhash)
        .then(valid => {
          if (!valid) {
            return res.status(401).json({ error: 'Mot de passe incorrect !' });
          }
          console.log("Mot de passe correct")
          result[0].token = jwt.sign(
            { userId: result[0].id },
            'Votre clé',
          )

          console.log(result[0]);
          response.status(200).json({User:result[0]})

        })
      .catch(error => response.status(500).json({ error }));
    }
  })

}

// Logique métier : User Modify Name

exports.modifyName = (req,res, next) => {

  let sql = `UPDATE utilisateur SET nom = "${req.body.nom}" WHERE id = ${req.params.id}`;
  connexion.query(sql, (err, res) => {
    if(err) throw err;
    console.log(res);
  })

  let sql2 = `UPDATE postes SET nom = "${req.body.nom}" WHERE user_id = ${req.params.id}`;
  connexion.query(sql2, (err, res) => {
    if(err) throw err;
    console.log(res)
  })

  let sql3 = `UPDATE comment SET nom = "${req.body.nom}" WHERE user_id = ${req.params.id}`;
  connexion.query(sql3, (err, res) => {
    if(err) throw err;
    console.log(res)
  })

}

exports.modifySurname = (req,res, next) => {

  let sql = `UPDATE utilisateur SET prenom = "${req.body.prenom}" WHERE id = ${req.params.id}`;
  connexion.query(sql, (err, res) => {
    if(err) throw err;
    console.log(res);
  })

  let sql2 = `UPDATE postes SET prenom = "${req.body.prenom}" WHERE user_id = ${req.params.id}`;
  connexion.query(sql2, (err, res) => {
    if(err) throw err;
    console.log(res)
  })

  let sql3 = `UPDATE comment SET prenom = "${req.body.prenom}" WHERE user_id = ${req.params.id}`;
  connexion.query(sql3, (err, res) => {
    if(err) throw err;
    console.log(res)
  })
  
}

exports.deleteUser = (req, res, next) => {
  let sql = `DELETE FROM utilisateur WHERE id = ${req.params.id}`;
  connexion.query(sql, (err, res) => {
    if(err) throw err;
    console.log(res)
    const filename = req.body.file.split('http://localhost:3000/images/')[1];
    fs.unlink(`images/${filename}`, (err) => {
      console.log(`images/${filename}`);
      if(err) throw err;
      console.log("Fichier délié")
    })
  })
}



