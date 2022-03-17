// Import de connexion mysql

const connexion = require("../env")

// Import Publication class

let comment = require("../models/Comment")

// Créer un commentaire

exports.createComment = (req, response, next) => {
  let post = new comment(req.body.nom, req.body.prenom, req.body.content, req.body.user_id, req.body.post_id, req.body.user_image);
  let sql = "INSERT INTO comment SET ?";
  let query = connexion.query(sql,post, (err, res) => {
    if(err) throw err;
    console.log(res);
    console.log("Commentaire crée");

    let sql2 = `SELECT MAX(id) FROM comment WHERE nom = "${req.body.nom}" AND prenom = "${req.body.prenom}" AND content = "${req.body.content}" AND user_id = "${req.body.user_id}"`;
    let query2 = connexion.query(sql2, (err, res) => {
      if(err) throw err;
      data = JSON.parse(JSON.stringify(res))[0];
      post_id = data[Object.keys(data)[0]];
      console.log(post_id)

      let sql3 = `SELECT * FROM comment WHERE id = "${post_id}"`;
      let query3 = connexion.query(sql3, (err, res) => {
        if(err) throw err;
        return response.status(200).json(res[0]);
      })
    })
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

// Supprimer une publication

exports.deleteComment = (req,response, next) =>{
  if(req.body.user_id === req.body.id || req.body.role === "Admin"){
    let sql = `DELETE FROM comment WHERE id = ${req.params.id}`
    let query = connexion.query(sql, (err, res) => {
    if(err) throw err;
    console.log(res);
    console.log("Commentaire supprimé")
    return response.status(200).json(req.params.id)
  })
  }
}
