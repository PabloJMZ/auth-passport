const express = require('express');
const app = express();

const morgan = require('morgan');
const ip = require('ip');
const path = require('path');
const port = process.env.PORT || 5000;
const router = require('./src/routes');
// views engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'src', 'views'));

// middlewares
app.use(morgan('dev'));
app.use(express.static('src/public'));
app.use(express.urlencoded({extended: false}));
app.use(express.json());

// routes
app.use(router);

app.listen(port,()=>{
    console.log(`http://localhost:${port}`);
    console.log(`http://${ip.address()}:${port}`);
});