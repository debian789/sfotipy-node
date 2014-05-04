var Backbone = require('backbone'),
    PlayList    = require('../models/playList');


module.exports = Backbone.Collection.extend({
  model: PlayList
});
