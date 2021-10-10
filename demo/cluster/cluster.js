const cluster = require('cluster').;
const http = require('http');
const os = require('os');
const numCPUs = os.cpus().length;
var a = [];

if (cluster.isMaster) {
    console.log("Master:" + process.pid);
    for (let i = 0; i < numCPUs; i++)
        cluster.fork();
    cluster.on('online', function(worker) {
        console.log('Worker ' + worker.process.pid + ' is online');
    });

    cluster.on('exit', function(worker, code, signal) {
        console.log('Worker ' + worker.process.pid + ' died with code: ' + code + ', and signal: ' + signal);
        console.log('Starting a new worker');
        cluster.fork();
    });

} else {
    http.createServer((req, res) => {
        const message = `Worker: ${process.pid} ${cluster.worker.id}`;
        console.log(message);
        res.end(message);
    }).listen(8080);
}