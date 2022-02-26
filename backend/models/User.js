// Création d'une classe poste

class user {
    nom = {
        type: String,
        required: true,
        maxLenght: 100
    }
    prénom = {
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
    constructor(nom, prénom, email, passwordhash){
        this.nom = nom;
        this.prénom = prénom;
        this.email = email;
        this.passwordhash = passwordhash;
    }
}

// Export de la classe User

module.exports = user;