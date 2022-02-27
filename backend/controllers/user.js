// Appel de connexion mysql

const connexion = require("../env")

// Appel du package bcrypt

const bcrypt = require("bcrypt");

// Appel du package jsonwebtoken (TOKEN)

const jwt = require('jsonwebtoken');

// Appel du model User

const User = require("../models/User");

// Logique métier : User Inscription

exports.signup = (req, res, next) => {
  bcrypt.hash(req.body.user.passwordhash, 10)
    .then(hash => {
      let user = new User(req.body.user.nom, req.body.user.prénom, req.body.user.email, hash);
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

exports.login = (req,res, next) => {
  let user_email = req.body.user_login.email;
  let sql = "SELECT * FROM utilisateur WHERE email = ?"; /*passwordhash*/
  let query = connexion.query(sql, user_email, (err, res) => {
    if(err) throw err;
    if(res.length > 0) {
      bcrypt.compare(req.body.user_login.password, res.passwordhash)
        .then(valid => {
          if (!valid) {
            return res.status(401).json({ error: 'Mot de passe incorrect !' });
          }
          res.status(200).json({
            userId: res.id,
            token: jwt.sign(
              { userId: res.id },
              '0tzC7I9v1uDBdKUHrilvGCZ69u8bvrO2h5xw939eA0wBP9l7Sh4MJT498IbxBKT7PYg0GubbKFoXLdK5Zb37p69CB9xcF5AiTLNFhOBoK9PW9I0ubWyqDz9YdTrX4m8jGkBam7gv93wO1wevYx3l6Eyyc9dU6pr4hje7WFyoxmmoM2pzaqI9WKvkYaDbaD8JP9rmadmm',
              { expiresIn: '24h' }
            )
          });
        })
      .catch(error => res.status(500).json({ error }));
    }
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