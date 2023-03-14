var mqtt = require('mqtt');
 
var settings = {
	port: 1883
};

var client = mqtt.connect('mqtt://127.0.0.1', settings);
client.subscribe('GARDEN01');
 
console.log('Client publishing...');
// the client publish a new message

// fired when new message is received
client.on('message', function(topic, message) {
  //console.log("ok");
  console.log(topic+' '+message.toString());
});


var message = {
  topic: 'GARDEN01',
  payload: {"SensorID":"0002", "Timestamp":"" , "Humidity":"", "Ph":"", "Temperature":""},
  qos: 2,
  retain: true
};

function msgfoo() {
        // the server publish new message
		const d = new Date();
		message.payload.Timestamp = d.toLocaleString();
		message.payload.Humidity = (Math.random() * (100 - 0) + 0).toString();
		message.payload.Ph = (Math.random() * (14 - 0) + 0).toString();
		message.payload.Temperature = (Math.random() * (45 - -10) + -10).toString();
        client.publish('GARDEN01', JSON.stringify(message.payload));
}

setInterval(msgfoo, 1000);

