var mqtt = require('mqtt');
var fs = require('fs')

var settings = {
	port: 1885
};

var client = mqtt.connect('mqtt://127.0.0.1', settings);
var list = [];

// the client subscribe some new topic
client.subscribe('GARDEN03');

console.log('Client started...');

// fired when new message is received
client.on('message', function(topic, message) {
  console.log('New data detected...');
  const obj = JSON.parse(message);
  console.log('Saving data...')
  fs.appendFile("Data.txt", message+'\n', 'utf8', function (err) {
	if (err){
    console.log("An error occured while writing JSON Object to File.");
    return console.log(err);
    }
});});

