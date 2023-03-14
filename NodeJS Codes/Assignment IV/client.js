var mqtt = require('mqtt');
 
var settings = {
	port: 1883
};

var client = mqtt.connect('mqtt://127.0.0.1', settings);
client.subscribe('IOT22');
 
console.log('Client publishing...');
// the client publish a new message

// fired when new message is received
client.on('message', function(topic, message) {
  //console.log("ok");
  console.log(topic+' '+message.toString());
});


var message = {
  topic: 'IOT22',
  payload: {"StudentID":"s4545532" , "Timestamp":"" , BloodPressure:""},
  qos: 2,
  retain: true
};

function msgfoo() {
        // the server publish new message
		const d = new Date();
		message.payload.Timestamp = d.toLocaleString();
		message.payload.BloodPressure = (Math.random() * (180 - 80) + 80).toString();
        client.publish('IOT22', JSON.stringify(message.payload));
}

setInterval(msgfoo, 1000);

