const { v4: uuidv4 } = require('uuid');
const User = require('../models/users');
const { setUser, getUser } = require('../service/auth');

async function handleUserSignup(req, res){
    let { userName, email, password } = req.body;
    await User.create({
        userName: userName,
        email: email,
        password: password
    });
    return res.redirect('login');
}

async function handleUserLogin(req, res){
    let {userName, password} = req.body;
    const user = await User.findOne({userName, password});
    if(!user){
        return res.redirect('/login');
    }
    const sessionId = uuidv4();
    setUser(sessionId, user);
    res.cookie("uid", sessionId);
    return res.redirect('/');
}

module.exports = {
    handleUserSignup,
    handleUserLogin
};