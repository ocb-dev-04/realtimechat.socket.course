const  { Router } = require('express');
const router = Router();

const { 
    getAll,
 } = require('../controllers/users');

const { 
    validateJWT 
} = require('../middlewares/validate_jwt');

router.get('/', validateJWT,  getAll);

module.exports = router;