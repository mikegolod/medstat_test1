var fs = require('fs');
var server = require('./http-ws-server');

var counter = 0;
var dataFile = 'counter.txt'

if (fs.existsSync(dataFile)) {
    var buf = fs.readFileSync(dataFile);
    counter = parseInt(buf);
} else {
    fs.writeFileSync(dataFile, counter);
}

setInterval(updateCounterFromFile, 60000);

server.ws.on('connection', (socket) => {
    socket.send(counter);

    socket.on('message', (msg) => {
        counter = parseInt(msg);
        notifyAll()
    });
    
});

function updateCounterFromFile() {
    fs.readFile(dataFile, (err, data) => {
        if (err) {
            console.log(err.message);
        } else {
            var n = parseInt(data);
            if (n !== counter) {
                counter = n;
                notifyAll();
            }
        }
    });
}

function notifyAll() {
    server.ws.clients.forEach((client) => {
        client.send(counter);
    });
}
