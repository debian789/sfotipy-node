var PlayList = require('../models/playList');

var one = new PlayList({
name:"Rock local",
by:"Wilmar Peñuela",
followers: "1",
descripcion:"musica nueva !!! ",
img:"wilmar.jpg",
songs: [
    {
    name: "Desvaneciente",
    artist:"Wilmar Peñuela",
    album:"Desconocido",
    length: "3:02",
    src:"desvaneciente.mp3"
    },
    {
    name: "No se si bien o mal",
    artist:"Wilmar Peñuela",
    album:"Desconocido",
    length: "3:27",
    src:"no_se_si_bien_o_mal.mp3"
    }
]
});


one.save(function(err,one){
    console.log("one was saved");
});


