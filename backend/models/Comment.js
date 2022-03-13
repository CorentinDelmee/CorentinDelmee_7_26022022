
// Création d'une classe post

class comment {
    nom = {
        type: String,
        required: true,
        maxLenght: 200,
    }
    prenom = {
        type: String,
        required: true,
        maxLenght: 200,
    }
    content = {
        type: String,
        required: true,
        maxLenght: 500,
    }
    user_id = {
        type: Number,
        required: true,
    }
    post_id = {
        type: Number,
        required: true,
    }
    user_image = {
        type: String,
        required: true,
    }

    constructor(nom, prenom, content, user_id, post_id, user_image){
        this.nom = nom;
        this.prenom = prenom;
        this.content = content;
        this.user_id = user_id;
        this.post_id = post_id;
        this.user_image = user_image;
    }
}

// Export de la classe publication pour app.js

module.exports = comment