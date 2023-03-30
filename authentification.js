/* eslint-disable consistent-return */
const jwt = require('jsonwebtoken');

const config = process.env;

// express authentification middleware
const authentification = (req, res, next) => {
    const token = req.headers.authorization || req.body.token || req.query.token || req.headers['x-access-token'];
    if (!token) {
        return res.status(403).send("Un jeton est requis pour l'authentification");
    }
    try {
        const decoded = jwt.verify(token.slice(7), config.TOKEN_KEY);
        req.user = decoded;
    } catch (err) {
        return res.status(401).send('Jeton Invalide');
    }
    return next();
};

module.exports = authentification;
