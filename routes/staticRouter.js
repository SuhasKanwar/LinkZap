const express = require('express');
const URL = require('../models/url');

const router = express.Router();

router.get('/', async (req, res) => {
    if(!req.user){
        return res.redirect('/login');
    }
    const allURLs = await URL.find({ createdBy: req.user._id });
    return res.render("home",{
        urls: allURLs,
        id: req.query.id
    });
});

router.get('/login', (req, res) => {
    return res.render('login');
});

router.get('/login/create-user', (req, res) => {
    return res.render('createAccount');
});

module.exports = router;