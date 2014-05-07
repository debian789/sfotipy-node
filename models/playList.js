var models = require('./models');
var Schema = models.Schema;

var playList = new Schema({
	name: String,
	by  :String,
	followers: Number,
	descripcion:String,
	img: String,
	songs:[{
		name:String,
		artist:String,
		album:String,
		length:String,
		src:String
	}]

});


var PlayList = models.model('PlayList',playList);

module.exports = PlayList;