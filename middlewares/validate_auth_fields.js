const { check, validationResult } = require('express-validator');

const validateFields = (req, res, next)=>{
    const errors =  validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors: errors.array()});
    }
    next();
}

const createUserValidators = [
    check('name', 'Name is required').not().isEmpty(),
    check('email', 'Email is required').not().isEmpty(),
    check('email', 'Email invalid').isEmail(),
    check('password', 'Password is required').not().isEmpty(),
    check('password', 'Password need 6 chars or more').isLength({ min: 6 }),
    validateFields,
];

module.exports = {
    createUserValidators
}