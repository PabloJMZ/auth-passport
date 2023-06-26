const LocalStrategy = require('passport-local').Strategy;

function configurePassport(passport, database){
  // Configuración de Passport.js
  passport.use('sign-in',
    new LocalStrategy({
      usernameField: 'username',
      passwordField: 'password',
      passReqToCallback: true
    },
    (req, username, password, done) => {
      // Buscar el usuario en la base de datos
      console.log(username, password);
      const user = database.find(u => u.username === username);

      if (!user || user.password !== password) {
        return done(null, false, req.flash('signupMessage', 'Nombre de usuario o contraseña incorrectos'));
      }
      return done(null, user);
    })
  );
  
  passport.use('sign-up',
    new LocalStrategy({
      usernameField: 'username',
      passwordField: 'password',
      passReqToCallback: true
    },
    (req, username, password, done) => {
      // Buscar el usuario en la base de datos
      const findUser = database.find(u => u.username === username);
      if (findUser) {
        return done(null, false, req.flash('signInMessage', 'Usuario ocupado'));
      }
      const user = { username, password }
      database.push(user);
      return done(null, user);
    })
  );

  passport.serializeUser((user, done) => {
    done(null, user.username);
  });

  passport.deserializeUser((username, done) => {
    const user = database.find(u => u.username === username);
    done(null, user);
  });
}

module.exports = configurePassport;