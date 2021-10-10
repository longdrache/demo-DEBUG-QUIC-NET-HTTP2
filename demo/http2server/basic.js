const http2 = require('http2');
const fs = require('fs');
const path = require('path');

const server = http2.createSecureServer({
    key: fs.readFileSync('localhost-privkey.pem'),
    cert: fs.readFileSync('localhost-cert.pem')
});
server.on('error', (err) => console.error(err));

server.on('stream', (stream, headers) => {
    // stream is a Duplex
    // stream.respond({
    //     'content-type': 'text/html; charset=utf-8',
    //     ':status': 200
    // });

    stream.respondWithFile(path.join(__dirname, '/static/index.html'), {
        ':status': 200,
        'content-type': 'text/html; charset=utf-8',
    }, {
        onError: (err) => {
            if (err.code === 'ENOENT') {
                stream.respond({ ':status': 404 });
            } else {
                stream.respond({ ':status': 500 });
            }
            stream.end();
        }
    })
});

server.listen(8443);