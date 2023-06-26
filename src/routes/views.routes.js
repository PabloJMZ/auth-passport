const express = require('express');
const isAuthenticated = require('../auth/isAuhenticated');
const skipAuth = require('../auth/skipAuth');
const router = express.Router();

router.get('/',(req, res) => {
    res.render('index');
})

router.get('/Sign-In',
    skipAuth,
    (req, res) => {
    const message = req.flash('messageSign-In')[0];
    res.render('login',{message});
})

router.get('/Sign-Up',
    skipAuth,
    (req, res) => {
    const message = req.flash('messageSign-Up')[0];
    res.render('register',{message});
})

router.get('/home',
    isAuthenticated,
    (req, res) => {
        res.render('home');
    }
)
module.exports = router;