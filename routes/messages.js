const  { Router } = require('express');
const router = Router();

const { 
    getAll,
 } = require('../controllers/messages');

const { 
    validateJWT 
} = require('../middlewares/validate_jwt');

router.get('/:from', validateJWT,  getAll);

module.exports = router;