require('mongoose');
const Usr = require('../models/user');
const jwt = require('jsonwebtoken');

const login = async(email,password) => {
    const cryptoPass = require('crypto')
        .createHash('sha256')
        .update(password)
        .digest('hex');

    const result = await Usr.findOne({ email: email, isActive: true, password: cryptoPass });

    if (result){
        const payload = {
            userId: result.id,
            name: result.name,
            email: result.email
        };
        const token = jwt.sign(payload, process.env.SECRET_KEY, { expiresIn: '1h' })
        return token;
    }
    return null; // retorno 
}

module.exports = {login}