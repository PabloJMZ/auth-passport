const LocalStrategy = require('passport-local').Strategy;

function configurePassport(passport, User){
  // Configuración de Passport.js
  passport.use('sign-in',
    new LocalStrategy({
      usernameField: 'username',
      passwordField: 'password',
      passReqToCallback: true
    },
    async (req, username, password, done) => {
      // Buscar el usuario en la base de datos
      const user = await User.findOne({username});

      if (!user || user.password !== password) {
        return done(null, false, req.flash('messageSign-In', 'Nombre de usuario o contraseña incorrectos'));
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
    async (req, username, password, done) => {
      // Buscar el usuario en la base de datos
      const findUser = await User.findOne({username});
      if (findUser) {
        return done(null, false, req.flash('messageSign-Up', 'Username no disponible'));
      }
      const newUser = new User({username,password});
      await newUser.save();
      return done(null, newUser);
    })
  );

  passport.serializeUser((user, done) => {
    done(null, user._id);
  });

  passport.deserializeUser(async (id, done) => {
    const user = await User.findOne({_id: id});
    done(null, user);
  });
}

module.exports = configurePassport;