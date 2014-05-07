var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/'+'sfotipy-node');

module.exports = mongoose; 
