const jwt = require('jsonwebtoken');

const generateJWT = (uid) => {
    return new Promise((resolve, reject) => {
        const payload = {uid};
        jwt.sign(payload, process.env.JWT_SECRET_KEY, {expiresIn: '24h'}, (err, token) => {
            if(err){
                reject('Error generating JWT');
            }else{
                resolve(token);
            }
        });
    })

}

const checkJWT = () => {}

module.exports = {
    generateJWT,
    checkJWT
}