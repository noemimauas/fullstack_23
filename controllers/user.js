require('mongoose');
const Usr = require('../models/user');

const addUser = async (email, name, password, isActive) => {
    let existUser = await Usr.findOne({ email: email });
    console.log(existUser);
    if(!existUser) {
        const cryptoPass = require('crypto')
        .createHash('sha256')
        .update(password)
        .digest('hex');
        const usr = new Usr(
            {              
                email: email,
                name: name,
                isActive:isActive,
                password:cryptoPass
            }
        );
        let user = await usr.save(); 
        console.log("usuario nuevo");
        console.log(user);
        return { user }; 
    } else{
        return false;
    }
}   

const getUser = async(id) => {
    const user = await Usr.findById(id);
    return user;
}

const editUser = async(user) => {
    const result = await Usr.findByIdAndUpdate(user._id, user, {new:true});
    return result;
}

const deleteUser = async(id) => {
    const result = await Usr.findByIdAndDelete(id);
    return result;
}

module.exports = { addUser, getUser, editUser, deleteUser }