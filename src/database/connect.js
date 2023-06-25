const mongoose = require('mongoose');

function connect(uri){
    return mongoose.connect(uri);
}

module.exports = connect;