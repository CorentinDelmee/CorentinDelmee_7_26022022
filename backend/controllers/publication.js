// Import de connexion mysql

const connexion = require("../env")

// Importation package node ("file system")

const fs = require("fs");

// Import Publication class

let publication = require("../models/Publication");

// Créer une publication

exports.createPublication = (req, response, next) => {
  let filename;
  if(req.body.image){
    filename = null
  }
  else{
    filename = `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
  }
  console.log("Bonjour");
  console.log(req.body);
  let post = new publication(req.body.nom, req.body.prenom, req.body.user_id, req.body.content, filename, req.body.user_image);
  let sql = "INSERT INTO postes SET ?";
  connexion.query(sql,post, (err, res) => {
    if(err) throw err;
    console.log(res);
    console.log("Publication crée");

    let sql2 = `SELECT MAX(id) FROM postes WHERE content = "${req.body.content}" AND user_id = "${req.body.user_id}"`;
    connexion.query(sql2, (err,res) => {
      if(err) throw err;
      data = JSON.parse(JSON.stringify(res))[0];
      post_id = data[Object.keys(data)[0]];
      console.log(post_id)

      let sql3 = `SELECT * FROM postes WHERE id = "${post_id}"`
      connexion.query(sql3, (err, res) => {
        if(err) throw err;
        return response.status(200).json(res[0]);
      })
    })
  });
};

// Récupérer toutes les publications

exports.getAllPublication = (req,response, next) => {
  let result;
  let sql = "SELECT * FROM postes ORDER BY id DESC";
  connexion.query(sql, (err, res) => {
    if(err) {console.log(err)};
    console.log("Récupération de toutes les publications")
    result = (JSON.parse(JSON.stringify(res)))
    console.log(result)
    response.json(result);
  });

};

// Modification d'une publication

exports.modifyPublication = (req,response, next) => {

  if(req.body.id === req.body.user_id || req.body.role === "Admin"){
    let sql = `UPDATE postes SET content = '${req.body.content}' WHERE id = ${req.params.id}`;
    connexion.query(sql, (err, res) => {
      if(err) throw err;
      console.log(res);
      console.log("Contenu de la publication modifié");
    });
  
    if(!req.body.image){
      let sql2 = `UPDATE postes SET file = '${req.protocol}://${req.get('host')}/images/${req.file.filename}' WHERE id = ${req.params.id}`;
      connexion.query(sql2, (err, res) => {
      if(err) throw err;
      console.log(res);
      console.log("Image de la publication modifiée");
      if(req.body.filename){
        const filename = req.body.filename.split('http://localhost:3000/images/')[1];
        fs.unlink(`images/${filename}`, (err) => {
        if(err) throw err;
        console.log("Fichier délié")
      })
      }
    });
    }
    let sql3 = `SELECT * FROM postes WHERE id = "${req.params.id}"`
    connexion.query(sql3, (err, res) => {
      return response.status(200).json(res[0])
    })
  }
};

// Supprimer une publication

exports.deletePublication = (req,response, next) =>{

  if(req.body.id === req.body.user_id || req.body.role === "Admin"){
    let sql = `DELETE FROM postes WHERE id = ${req.params.id}`
    connexion.query(sql, (err, res) => {
      if(err) throw err;
      console.log(res);
      console.log("Publication supprimée");
      if(req.body.filename != null){
        const filename = req.body.filename.split('http://localhost:3000/images/')[1];
        fs.unlink(`images/${filename}`, (err) => {
          console.log(`images/${filename}`);
          if(err) throw err;
          console.log("Fichier délié")
        })
      }
      return response.status(200).json(req.params.id)
    })
  }
}
