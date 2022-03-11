// Appel du package jsonwebtoken (TOKEN)

const jwt = require('jsonwebtoken');


// Export Middleware auth

module.exports = (req, res, next) => {
  try {
    console.log(req.headers.authorization.split(' ')[1]);
    const token = req.headers.authorization.split(' ')[1];
    const decodedToken = jwt.verify(token, '0tzC7I9v1uDBdKUHrilvGCZ69u8bvrO2h5xw939eA0wBP9l7Sh4MJT498IbxBKT7PYg0GubbKFoXLdK5Zb37p69CB9xcF5AiTLNFhOBoK9PW9I0ubWyqDz9YdTrX4m8jGkBam7gv93wO1wevYx3l6Eyyc9dU6pr4hje7WFyoxmmoM2pzaqI9WKvkYaDbaD8JP9rmadmm');
    const userId = decodedToken.userId;
    if ((req.body.user_id && req.body.user_id !== userId) || (req.body.id && req.body.id !== userId)) {
      throw 'Invalid user ID';
    } else {
      next();
    }
  } catch {
    res.status(401).json({
      error: new Error('Invalid request!')
    });
  }
};