function skipAuth(req, res, next){
    if(req.isAuthenticated()){
        return res.redirect('/home');
    }
    next();
}

module.exports = skipAuth;