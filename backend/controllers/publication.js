// Import de connexion mysql

const connexion = require("../env")

// Importation package node ("file system")

const fs = require("fs");

// Import Publication class

let publication = require("../models/Publication")

// Créer une publication

exports.createPublication = (req, res, next) => {
  let filename;
  if(req.body.image){
    filename = null
  }
  else{
    filename = `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
  }
  console.log("Bonjour");
  console.log(req.body);
  let post = new publication(req.body.nom, req.body.prenom, req.body.user_id, req.body.content, filename);
  let sql = "INSERT INTO postes SET ?";
  let query = connexion.query(sql,post, (err, res) => {
    if(err) throw err;
    console.log(res);
    console.log("Publication crée");
  });
};

// Récupérer toutes les publications

exports.getAllPublication = (req,response, next) => {
  let result;
  let sql = "SELECT * FROM postes ORDER BY id DESC";
  let query = connexion.query(sql, (err, res) => {
    if(err) {console.log(err)};
    console.log("Récupération de toutes les publications")
    result = (JSON.parse(JSON.stringify(res)))
    console.log(result)
    response.json(result);
  });

};

// Modification d'une publication

exports.modifyPublication = (req,res, next) => {
  let sql = `UPDATE postes SET content = '${req.body.content}' WHERE id = ${req.params.id}`;
  let query = connexion.query(sql, (err, res) => {
    if(err) throw err;
    console.log(res);
    console.log("Publication Content modifié");
  });

  if(!req.body.image){
    let sql2 = `UPDATE postes SET file = '${req.protocol}://${req.get('host')}/images/${req.file.filename}' WHERE id = ${req.params.id}`;
    let query = connexion.query(sql2, (err, res) => {
    if(err) throw err;
    console.log(res);
    console.log("Publication Image modifié");
    const filename = req.body.filename.split('http://localhost:3000/images/')[1];
    fs.unlink(`images/${filename}`, (err) => {
      if(err) throw err;
      console.log("file unlinked")
    })
  });
  }
};

// Supprimer une publication

exports.deletePublication = (req,res, next) =>{
  let sql = `DELETE FROM postes WHERE id = ${req.params.id /*req.body.post_delete.post_id*/}`
  let query = connexion.query(sql, (err, res) => {
    if(err) throw err;
    console.log(res);
    console.log("Publication supprimée");
    const filename = req.body.filename.split('http://localhost:3000/images/')[1];
    fs.unlink(`images/${filename}`, (err) => {
      console.log(`images/${filename}`);
      if(err) throw err;
      console.log("file unlinked")
    })

  })
}
