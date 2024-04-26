const jwt = require('jsonwebtoken');
require('dotenv').config({ path: './config/.env' });

module.exports = (req, res, next) => {
    const token = req.cookies.token;
    if (!token) {
      return res.status(401).json({ message: 'Vous devez être connecté pour accéder à cette ressource' });
    }
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = decoded;
      next();
    } catch (err) {
      res.status(400).json({ message: 'Vous n\'êtes pas autorisé à accéder à cette ressource' });
    }
}