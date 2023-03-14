var mosca = require('mosca');

var settings = {
  port: 1887
};

// here we start mosca
var server = new mosca.Server(settings);
// fired when the mqtt server is ready
server.on('ready', function() {
  console.log(Date() + ' Mosca server started');
});

// fired when a client is connected
server.on('clientConnected', function(client) {
  console.log('Client Connected: ', client.id);
});

// fired when a message is received
server.on('published', function(packet, client) {
  console.log('Published : ', packet.topic.toString()+' '+packet.payload.toString());  
});

// fired when a client subscribes to a topic
server.on('subscribed', function(topic, client) {
  console.log('Subscribed : ', topic, " from : ", client.id);
});

// fired when a client unsubscribes to a topic
server.on('unsubscribed', function(topic, client) {
  console.log('Unsubscribed : ', topic, " from : ", client.id);
});

// fired when a client is disconnected
server.on('clientDisconnected', function(client) {
  console.log('Client Disconnected : ', client.id);
});

