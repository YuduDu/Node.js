var Radio = require('./eventEmitter-radio.js');

var station = {freq:'80.16',
	name:'eventEmitter test'
};

var radio = new Radio(station);

radio.on('open',function(station){
	console.log('"%s" FM %s OPENED',station.name,station.freg);
	console.log('~~~~~~~~~~~~~~~~~~~~~~~');
});

radio.on('close',function(station){
	console.log('"%s" FM %s CLOSED',station.name,station.freg);
});