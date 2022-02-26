// Import de connexion mysql

const connexion = require("../env")

// Import Publication class

let publication = require("../models/Publication")

// Créer une publication

exports.createPublication = (req, res, next) => {
  let post = new publication(req.post.user_id, req.post.content);
  let sql = "INSERT INTO postes SET ?";
  let query = connexion.query(sql,post, (err, res) => {
    if(err) throw err;
    console.log(res);
    console.log("Publication crée");
  });
};

// Récupérer toutes les publications

exports.getAllPublication = (req,res, next) => {
  let sql = "SELECT * FROM postes";
  let query = connexion.query(sql, (err, res) => {
    if(err) throw err;
    console.log(res);
    console.log("Récupération de toutes les publications");
  })
};

// Modification d'une publication

exports.modifyPublication = (req,res, next) => {
  let sql = `UPTDATE postes SET content = "${req.content}" WHERE id = ${req.params.id}`;
  let query = connexion.query(sql, (err, res) => {
    if(err) throw err;
    console.log(res);
    console.log("Publication modifiée");
  });
};

// Supprimer une publication

exports.deletePublication = (req,res, next) =>{
  let sql = `DELETE FROM postes WHERE id = ${req.params.id}`
  let query = connexion.query(sql, (err, res) => {
    if(err) throw err;
    console.log(res);
    console.log("Publication supprimée")

  })
}
