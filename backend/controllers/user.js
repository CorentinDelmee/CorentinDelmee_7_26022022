// Appel de connexion mysql

const connexion = require("../env")

// Appel du package bcrypt

const bcrypt = require("bcrypt");

// Appel du package jsonwebtoken (TOKEN)

const jwt = require('jsonwebtoken');

// Appel du model User

const User = require("../models/User");
const { response } = require("express");

// Logique métier : User Inscription

exports.signup = (req, res, next) => {
  bcrypt.hash(req.body.passwordhash, 10)
    .then(hash => {
      let filename = `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
      let user = new User(req.body.nom, req.body.prenom, req.body.email, hash, req.body.role, filename);
      let sql = "INSERT INTO utilisateur SET ?"
      let query = connexion.query(sql, user, (err, res) => {
        if(err) throw err;
      console.log(res);
      console.log("Utilisateur crée");
      }) 
    })
    .catch(error => res.status(500).json({ error }));
};

// Logique métier : User Connexion

exports.login = (req,response, next) => {
  let user_email = req.body.email;
  let sql = "SELECT * FROM utilisateur WHERE email = ?"; /*passwordhash*/
  let query = connexion.query(sql, user_email, (err, res) => {
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
            '0tzC7I9v1uDBdKUHrilvGCZ69u8bvrO2h5xw939eA0wBP9l7Sh4MJT498IbxBKT7PYg0GubbKFoXLdK5Zb37p69CB9xcF5AiTLNFhOBoK9PW9I0ubWyqDz9YdTrX4m8jGkBam7gv93wO1wevYx3l6Eyyc9dU6pr4hje7WFyoxmmoM2pzaqI9WKvkYaDbaD8JP9rmadmm',
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
  let query = connexion.query(sql, (err, res) => {
    if(err) throw err;
    console.log(res);
  })

  let sql2 = `UPDATE postes SET nom = "${req.body.nom}" WHERE user_id = ${req.params.id}`;
  let query2 = connexion.query(sql2, (err, res) => {
    if(err) throw err;
    console.log(res)
  })

  let sql3 = `UPDATE comment SET nom = "${req.body.nom}" WHERE user_id = ${req.params.id}`;
  let query3 = connexion.query(sql3, (err, res) => {
    if(err) throw err;
    console.log(res)
  })

}

exports.modifySurname = (req,res, next) => {

  let sql = `UPDATE utilisateur SET prenom = "${req.body.prenom}" WHERE id = ${req.params.id}`;
  let query = connexion.query(sql, (err, res) => {
    if(err) throw err;
    console.log(res);
  })

  let sql2 = `UPDATE postes SET prenom = "${req.body.prenom}" WHERE user_id = ${req.params.id}`;
  let query2 = connexion.query(sql2, (err, res) => {
    if(err) throw err;
    console.log(res)
  })

  let sql3 = `UPDATE comment SET prenom = "${req.body.prenom}" WHERE user_id = ${req.params.id}`;
  let query3 = connexion.query(sql3, (err, res) => {
    if(err) throw err;
    console.log(res)
  })
  
}

exports.deleteUser = (req, res, next) => {
  let sql = `DELETE FROM utilisateur WHERE id = ${req.params.id}`;
  query = connexion.query(sql, (err, res) => {
    if(err) throw err;
    console.log(res)
  })
}




/*
exports.login = (req, res, next) => {
  User.findOne({ email: req.body.email })
    .then(user => {
      if (!user) {
        return res.status(401).json({ error: 'Utilisateur non trouvé !' });
      }
      bcrypt.compare(req.body.password, user.password)
        .then(valid => {
          if (!valid) {
            return res.status(401).json({ error: 'Mot de passe incorrect !' });
          }
          res.status(200).json({
            userId: user._id,
            token: jwt.sign(
              { userId: user._id },
              '0tzC7I9v1uDBdKUHrilvGCZ69u8bvrO2h5xw939eA0wBP9l7Sh4MJT498IbxBKT7PYg0GubbKFoXLdK5Zb37p69CB9xcF5AiTLNFhOBoK9PW9I0ubWyqDz9YdTrX4m8jGkBam7gv93wO1wevYx3l6Eyyc9dU6pr4hje7WFyoxmmoM2pzaqI9WKvkYaDbaD8JP9rmadmm',
              { expiresIn: '24h' }
            )
          });
        })
        .catch(error => res.status(500).json({ error }));
    })
    .catch(error => res.status(500).json({ error }));
};
*/