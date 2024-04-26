const jwt = require('jsonwebtoken');
require('dotenv').config({ path: './config/.env' });

module.exports = (req, res, next) => {
    // Récupérer le token de l'utilisateur depuis les cookies
    const token = req.cookies.token;

    // Vérifier si le token existe
    if (!token) {
      // Redirection vers la page de connexion si le token n'existe pas
      return res.status(401).render('login', { message: 'Vous devez être connecté pour accéder à cette page.' });
    }

    try {
      // Vérifier le token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      // Ajouter les informations de l'utilisateur à la requête
      req.user = decoded;
      // Passer à l'étape suivante
      next();
    } catch (err) {
      // Déconnexion de l'utilisateur
      res.clearCookie('token');
      // Redirection vers la page de connexion
      res.status(400).render('login', { message: 'Votre session a expiré. Veuillez vous reconnecter.' });
    }
}