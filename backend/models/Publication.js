
// Création d'une classe post

class publication {
    nom = {
        type: String,
        maxLenght: 200,
    }
    prenom = {
        type: String,
        maxLenght: 200,
    }
    user_id = {
        type: Number,
        required: true,
    }
    content = {
        type: String,
        required: true,
        maxLenght: 500,
    }
    file = {
        type: String,
    }
    constructor(nom, prenom, user_id, content, file){
        this.nom = nom;
        this.prenom = prenom;
        this.user_id = user_id;
        this.content = content;
        this.file = file;
    }
}

// Export de la classe publication pour app.js

module.exports = publication