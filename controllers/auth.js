const  { response } = require('express');
const bcrypt = require('bcryptjs');

const User  = require('../models/user');
const { generateJWT } = require('../helpers/jwt');

const createUser = async (req, res = response) => {
    const { email, password } = req.body;
    try {
        // validate email
        const existUser = await User.findOne({ email });
        if(existUser) {
            return res.status(400).json({ msg: 'The email already exists' });
        }

        const user = new User(req.body);
        // encrypt password
        const salt = bcrypt.genSaltSync();
        user.password = await bcrypt.hash(password, salt);
        await user.save();

        // make first json web token
        const token = await generateJWT(user.id);
        
        res.json({ user, token });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Some error ocurred while create user' });
    }
}

const loginUser = async (req, res = response) => {
    res.json(req.body);
};

module.exports = {
    createUser,
    loginUser
}