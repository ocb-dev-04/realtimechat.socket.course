const { response } = require("express");
const jwt = require('jsonwebtoken');

const validateJWT = (req, res = response, next) => {
    const token = req.headers['x-token'] || req.headers['authorization'];
    if(!token){
        return res.status(401).json({ok: false, message: 'Token is required'});
    }

    try {
        const { uid } = jwt.verify(token, process.env.JWT_SECRET_KEY);
        req.uid = uid;
        next();
    } catch (error) {
        console.error(error);
        res.status(401).json({ok: false, message: 'Token invalid'});
    }
}

module.exports = {validateJWT}