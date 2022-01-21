const  { Router } = require('express');
const router = Router();

const { createUser, loginUser } = require('../controllers/auth');

const { createUserValidators } = require('../middlewares/validate_auth_fields');

router.post('/new', createUserValidators, createUser);

router.post('/login', loginUser);

module.exports = router;