const express = require('express');
const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { Cities, Users } = require('./models/db_models');
require('dotenv').config({ path: './config/.env' });

/** *-*-*-* EXPRESS CONFIGURATION *-*-*-* **/
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname + '/public'));
/** *-*-*-* END EXPRESS CONFIGURATION *-*-*-* **/

/** *-*-*-* EJS CONFIGURATION *-*-*-* **/
app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');
/** *-*-*-* END EJS CONFIGURATION *-*-*-* **/

/** *-*-*-* ENDPOINTS *-*-*-* **/
// Route pour rendre la vue du formulaire d'inscription
app.get('/view/register', async (req, res) => {
    try {
        const cities = await Cities.findAll(); // Récupérer toutes les villes de la base de données
        res.render('register', { cities, message: ''});
    } catch (error) {
        console.error(error);
        res.status(500).render('register', { message: 'Une erreur est survenue lors de la récupération des villes.' });
    }
});

// Route api pour gérer la soumission du formulaire d'inscription
app.post('/api/register', async (req, res) => {
    try {
        // Récupérer les données du formulaire
        const { user_name, user_email, user_phone, user_fname, user_lname, user_password, user_city, user_adress } = req.body;

        // Récupérer l'ID de la ville sélectionnée par l'utilisateur
        const city = await Cities.findOne({ where: { id: user_city } });

        // Vérifier si la ville existe
        if (!city) {
            return res.status(400).render('register', { message: 'La ville sélectionnée n\'existe pas.' });
        }

        // Hacher le mot de passe de l'utilisateur
        const hashedPassword = await bcryptjs.hash(user_password, 10);

        // Enregistrer l'utilisateur dans la base de données avec la ville
        await Users.create({
            user_name,
            user_email,
            user_phone,
            user_fname,
            user_lname,
            user_password: hashedPassword,
            user_adress,
            user_city: city.id // Ajouter l'ID de la ville à l'utilisateur
        });

        res.render('login', { message: 'Inscription réussie. Vous pouvez maintenant vous connecter.' });
    } catch (error) {
        console.error(error);
        res.status(500).render('register', { message: 'Une erreur est survenue lors de l\'inscription.' });
    }
});

// Route pour rendre la vue du formulaire de connexion
app.get('/view/login', (req, res) => {
    res.render('login', { message: '' });
});

// Route api pour gérer la soumission du formulaire de connexion
app.post('/api/login', async (req, res) => {
    try {
        // Récupérer les données du formulaire
        const { user_email, user_password } = req.body;

        // Vérifier si l'utilisateur existe
        const user = await Users.findOne({ where: { user_email } });
        if (!user) {
            return res.status(400).render('login', { message: 'L\'utilisateur n\'existe pas.' });
        }

        // Vérifier si le mot de passe est correct
        const isPasswordValid = await bcryptjs.compare(user_password, user.user_password);
        if (!isPasswordValid) {
            return res.status(400).render('login', { message: 'Le mot de passe est incorrect.' });
        }

        // Générer un token JWT
        const token = jwt.sign({ user_id: user.user_id }, process.env.JWT_SECRET, { expiresIn: '1h' });

        // Envoyer le token dans un cookie
        res.cookie('token', token, { httpOnly: true });

        res.render('login', { message: 'Connexion réussie.' });
    } catch (error) {
        console.error(error);
        res.status(500).render('login', { message: 'Une erreur est survenue lors de la connexion.' });
    }
});
/** *-*-*-* END ENDPOINTS *-*-*-* **/

/** *-*-*-* LISTENING SERVER *-*-*-* **/
app.listen(3000, () => {
    console.log(`Server is running on port ${3000}`);
});
/** *-*-*-* END LISTENING SERVER *-*-*-* **/