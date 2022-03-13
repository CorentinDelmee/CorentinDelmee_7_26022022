// Import de connexion mysql

const connexion = require("../env")

// Import Publication class

let comment = require("../models/Comment")

// Créer un commentaire

exports.createComment = (req, res, next) => {
  let post = new comment(req.body.nom, req.body.prenom, req.body.content, req.body.user_id, req.body.post_id, req.body.user_image);
  let sql = "INSERT INTO comment SET ?";
  let query = connexion.query(sql,post, (err, res) => {
    if(err) throw err;
    console.log(res);
    console.log("Commentaire crée");
  });
};

// Récupérer tout les commentaires

exports.getAllComment = (req,response, next) => {
  let result;
  let sql = "SELECT * FROM comment ORDER BY id DESC";
  let query = connexion.query(sql, (err, res) => {
    if(err) {console.log(err)};
    console.log("Récupération de toutes les commentaires")
    result = (JSON.parse(JSON.stringify(res)))
    console.log(result)
    response.json(result);
  });

};

// Modification d'un commentaire

exports.modifyComment = (req,res, next) => {
  let sql = `UPDATE comment SET content = '${req.body.content}' WHERE id = ${req.params.id}`;
  let query = connexion.query(sql, (err, res) => {
    if(err) throw err;
    console.log(res);
    console.log("Commentaire modifié");
  });
};

// Supprimer une publication

exports.deleteComment = (req,res, next) =>{
  if(req.body.user_id === req.body.id || req.body.role === "Admin"){
    let sql = `DELETE FROM comment WHERE id = ${req.params.id}`
    let query = connexion.query(sql, (err, res) => {
    if(err) throw err;
    console.log(res);
    console.log("Commentaire supprimé")
  })
  }
}
