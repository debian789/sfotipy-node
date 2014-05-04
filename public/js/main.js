var Backbone    = require('backbone'),
    Router      = require('./routers/router'),
    $           = require('jquery')
    Backbone.$  = $;


var Sfotipy = {
  Models: {},
  Views: {},
  Collections: {},
  Router: {},
  opcion:{"album":"album","playList":"playList"},
};

window.Sfotipy = Sfotipy;



$(function() {
  Backbone.app = new Router();
});
