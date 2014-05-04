var express = require('express');
var router = express.Router();


var fs = require('fs');
var baseData = fs.readFileSync('./data.json').toString();

var data = JSON.parse(baseData);

router.get('/',function(req,res){
	res.send(data);
});

module.exports = router;