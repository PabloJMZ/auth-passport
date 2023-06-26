const express = require('express');
const router = express.Router();

const passport = require('passport');
const skipAuth = require('../auth/skipAuth');

router.post('/Sign-In',
    skipAuth, 
    passport.authenticate('sign-in', {
    successRedirect: '/home',
    failureRedirect: '/Sign-In',
    failureFlash: true
}));

router.post('/Sign-Up',
    skipAuth,
    passport.authenticate('sign-up', {
    successRedirect: '/home',
    failureRedirect: '/Sign-Up',
    failureFlash: true
}));

module.exports = router;