const express = require('express');
const app = express();
require('dotenv').config();

const morgan = require('morgan');
const ip = require('ip');
const path = require('path');
const port = process.env.PORT || 5000;
const router = require('./src/routes');
// views engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'src', 'views'));

const passport = require('passport');
const flash = require('connect-flash');
const configurePassport = require('./src/auth/configurePassport');
// Arreglo para almacenar los usuarios (simulando una base de datos)
const User = require('./src/database/schemas/user');

configurePassport(passport, User);

app.use(require('express-session')({
  secret: 'secreto',
  resave: false,
  saveUninitialized: false
}));

app.use(flash()); // Agrega el middleware de connect-flash
app.use(passport.initialize());
app.use(passport.session());

// middlewares
app.use(morgan('dev'));
app.use(express.static('src/public'));
app.use(express.urlencoded({extended: false}));
app.use(express.json());

// routes
app.use(router);

app.get('/users',(req, res) => {
    res.json(database);
})

const connect = require('./src/database/connect');
async function start(){
    try {
        await connect(process.env.MONGO_URI);
        app.listen(port,()=>{
            console.log(`http://localhost:${port}`);
            console.log(`http://${ip.address()}:${port}`);
        });
    } catch (error) {
        console.error("Error in conncection");
    }
}

start();