
// Création d'une classe poste

class publication {
    user_id = {
        type: Number,
        required: true,
    }
    content = {
        type: String,
        required: true,
        maxLenght: 500,
    }
    constructor(user_id, content){
        this.user_id = user_id;
        this.content = content;
    }
}

// Export de la classe publication pour app.js

module.exports = publication