var Backbone   = require('backbone'),
    Handlebars = require('handlebars'),
    PlayListView = require('../views/playList'),
    $          = require('jquery'),
    app        = Backbone.app;


module.exports = Backbone.View.extend({
  el: $('#playList'),

  //template: Handlebars.compile($("#playList-template").html()),

  initialize: function () {
  
     this.listenTo(this.collection, "add", this.addOne, this);
  },

  // render: function () {
  //   this.collection.forEach(this.addOne, this);
  // },

 addOne: function (list) {
  //debugger;

     var playListView = new PlayListView({ model: list });
     this.$el.append(playListView.render().el);
   }

});
