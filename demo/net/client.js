const net = require('net');

const client = net.createConnection({ port: 8080 });

client.on('data', (data) => {
    console.log(data.toString('utf8'));
})
client.on("disconnected", () => {
    console.log('client disconnected');
})