const  { Router } = require('express');
const router = Router();

const { 
    createUser, 
    loginUser, 
    refreshToken 
 } = require('../controllers/auth');

const { 
    createUserValidators, 
    loginValidators,
} = require('../middlewares/validate_auth_fields');

const { 
    validateJWT 
} = require('../middlewares/validate_jwt');

router.post('/new', createUserValidators, createUser);

router.post('/login',loginValidators, loginUser);

router.get('/refreshJWT', validateJWT,  refreshToken);

module.exports = router;