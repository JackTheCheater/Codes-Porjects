var mqtt = require('mqtt');

var settings = {
	port: 1883
};

var client = mqtt.connect('mqtt://127.0.0.1', settings);
var list = [];

// the client subscribe some new topic
client.subscribe('IOT22');

console.log('Client started...');

// fired when new message is received
client.on('message', function(topic, message) {
  console.log('New data detected...');
  const obj = JSON.parse(message);
  list.push(parseFloat(obj.BloodPressure));
  avg = list.reduce((a,b) => a+b)/list.length;
  console.log('Current average of the blood pressures: ' +avg);
});

