import quic from 'node-quic';
import { StringDecoder } from 'string_decoder';
import http from 'http';
const port = 3000;
const address = '127.0.0.1';
var id = 0;
http.createServer((req, res) => {
    id++;
    console.log("connected");

    quic.send(port, address, { id })
        .onData((data) => {
            res.end(data);
        });


}).listen(port);