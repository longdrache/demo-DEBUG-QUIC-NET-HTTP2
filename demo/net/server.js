const net = require('net');



const server = net.createServer();
server.listen(8080)
var a = [];
server.on('connection', (client) => {
    console.log('Client connected');
    client.write('Hello World');
    a.push(client);
});

setInterval(() => {
    const now = new Date().toISOString();
    a.forEach(client => {
        client.write(now);
    });

}, 2000);