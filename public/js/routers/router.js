var Backbone      = require('backbone'),
    _             = require('underscore'),
    Albums       = require('../collections/albums'),
    Songs        = require('../collections/songs'),
    PlayLists    = require('../collections/playLists'),
    Album        = require('../models/album'),
    Song         = require('../models/song'),
    PlayList     = require('../models/playList'),
    ListView     = require('../views/list'),    
    PlayListView = require('../views/playLists'),
    PlayerView   = require('../views/player'),
    AlbumsView   = require('../views/albums'),
    SongView   = require('../views/song'),
    $            = require('jquery');
    var _str = require('underscore.string');



module.exports = Backbone.Router.extend({
  routes: {
    "": "index",
    "album/:name": "album",
    "playList/": "setPlayLists",
    "playList/:nameList": "setPlayLists"
  },

  initialize: function () {
    this.current   = {};
    this.jsonData  = {};
    this.albums    = new Albums();
    this.songs     = new Songs();
    this.playLists = new PlayLists(); 

    this.list      = new ListView({ collection: this.songs });    
    this.playList  = new PlayListView({ collection: this.playLists });    
    this.player    = new  PlayerView({ model: new Song() });
    this.albumlist = new AlbumsView({ collection: this.albums });




    Backbone.history.start();
  },

  index: function () {
    this.albumlist.$el.show();
    this.fetchData("album",Sfotipy.opcion.album);
  },

  setPlayLists:function(nameList){
    this.albumlist.$el.hide();
    //debugger;
    if(nameList){
      if (Object.keys(this.jsonData).length === 0) {
        var self = this;
        this.fetchData("playList",Sfotipy.opcion.playList).done(function () {
          self.addSongs(nameList,Sfotipy.opcion.playList);
        });
      } else {
      this.addSongs(nameList,Sfotipy.opcion.playList);
    }
  }else{
     this.fetchData("playList",Sfotipy.opcion.playList);
   }
 },

 album: function (name) {
  if (Object.keys(this.jsonData).length === 0) {
    var self = this;

    this.fetchData("album",Sfotipy.opcion.album).done(function () {
      self.addSongs(name,Sfotipy.opcion.album);
    });

  } else {
    this.addSongs(name,Sfotipy.opcion.album);
  }
},

fetchData: function (url,opcion) {
  var self = this;
  return $.getJSON(url).then(function (data) {
      self.jsonData = data;
      if(Sfotipy.opcion.album === opcion){
        for (var name in data) {
          if (data.hasOwnProperty(name)) {
            self.addAlbum(name, data[name]);
          }          
        }
      }else if(Sfotipy.opcion.playList === opcion){
        data.forEach(function(dat){
          self.addPlayList(dat);
        });
      }
    });
  },

  addSongs: function (name,opcion) {
    self = this;
    this.songs.reset();
    if(Sfotipy.opcion.album === opcion){
      this.current.album = this.jsonData[name];
      this.current.album.songs.forEach(this.addSong, this);      
    }else if(Sfotipy.opcion.playList === opcion){
      this.jsonData.forEach(function(d){
        if(_.isEqual(_str.trim(d.name ),name)){
          self.addSongList(d);
          return false;
        }
      });
    }
  },

  addSongList:function(dat){
    var self = this;
    _.each(dat.songs,function(data){
      //debugger;
      self.songs.add(new Song({
        album_cover: dat.img,
        album_name: data.name,
        author: data.author,
        name: data.name,
        length: data.length,
        src:data.src
      }));
    });
  },
  addSong: function (song) {

    var album = this.current.album;

    this.songs.add(new Song({
      album_cover: album.cover,
      album_name: album.name,
      author: album.author,
      name: song.name,
      length: song.length,
      src:song.src
    }));
  },

  addAlbum: function (name, album) {
    this.albums.add(new Album({
      name: name,
      author: album.author,
      cover: album.cover,
      year: album.year
    }));
  },
  addPlayList:function(dat){
    this.playLists.add(new PlayList({
      name:dat.name,
      followers:dat.followers,
      img:dat.img,
      by:dat.by,
      songs:dat.songs

    }));
  }

});
