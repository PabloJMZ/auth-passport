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
    res.render('login');
})

router.get('/Sign-Up',
    skipAuth,
    (req, res) => {
    res.render('register');
})

router.get('/home',
    isAuthenticated,
    (req, res) => {
        res.render('home');
    }
)
module.exports = router;