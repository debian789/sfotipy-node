var Backbone   = require('backbone'),
    Handlebars = require('handlebars'),
    $          = require('jquery'),
    AlbumView = require('./album'),
    app        = Backbone.app;



module.exports = Backbone.View.extend({
  el: $('#albums'),

  template: Handlebars.compile($("#album-template").html()),

  initialize: function () {
    this.listenTo(this.collection, "add", this.addOne, this);
  },

  render: function () {
    this.collection.forEach(this.addOne, this);
  },

  addOne: function (album) {
    var albumView = new AlbumView({ model: album });
    this.$el.append(albumView.render().el);
  }

});
