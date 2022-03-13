// Création d'une classe poste

class user {
    nom = {
        type: String,
        required: true,
        maxLenght: 100
    }
    prenom = {
        type: String,
        required: true,
        maxLenght: 100
    }
    email = {
        type: String,
        required: true,
        maxLenght: 255
    }
    passwordhash = {
        type: String,
        required: true,
        maxLenght: 500
    }
    role = {
        type: String,
        required: true,
    }
    file = {
        type: String,
        required: true,
    }
    constructor(nom, prenom, email, passwordhash, role, file){
        this.nom = nom;
        this.prenom = prenom;
        this.email = email;
        this.passwordhash = passwordhash;
        this.role = role;
        this.file = file;
    }
}

// Export de la classe User

module.exports = user;