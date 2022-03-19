// Appel du package jsonwebtoken (TOKEN)

const jwt = require('jsonwebtoken');


// Export Middleware auth

module.exports = (req, res, next) => {
  try {
    console.log(req.headers.authorization.split(' ')[1]);
    const token = req.headers.authorization.split(' ')[1];
    const decodedToken = jwt.verify(token, 'Votre clé');
    const userId = decodedToken.userId;
    if ((req.body.user_id && req.body.user_id !== userId) || (req.body.id && req.body.id !== userId)) {
      throw 'User Id invalide';
    } else {
      next();
    }
  } catch {
    res.status(401).json({
      error: new Error('Requete invalide !')
    });
  }
};