var express = require('express');
var router = express.Router();
var PlayList = require('../models/playList');



//var fs = require('fs');
//var baseData = fs.readFileSync('./data-playlist.json').toString();

//var data = JSON.parse(baseData);

router.get('/',function(req,res){
	PlayList.find({},function(err,playList){
		if(err){
			return res.send(err);
		}

		res.send(playList);
	});
//	res.send(data);
});




module.exports = router;