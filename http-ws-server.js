const http = require('http');
const ws = require('ws');
const fs = require('fs');
const path = require('path');


const httpServer = http.createServer((req, res) => {
    if (req.url == '/favicon.ico') {
        res.writeHead(200, {'Content-Type': 'image/x-icon'});
        res.end()
    } else if (req.url.startsWith('/bulma/css')) {
        servePublicFile('./node_modules', req, res)
    } else {
        servePublicFile('./public', req, res)
    }
});

const wsServer = new ws.Server({ server: httpServer });

function servePublicFile(basePath, req, res) {
    var resourcePath = path.normalize(`${basePath}${req.url}`);
    if (resourcePath.endsWith('/')) {
        resourcePath += 'index.html';
    }
    fs.readFile(resourcePath, (err, data) => {
        const stCode = err ? 404 : 200;
        console.log(req.method, req.url, stCode, '=>', resourcePath);
        if (err) {
            res.writeHead(stCode, err.message);
            res.end();
        } else {
            res.writeHead(stCode, { 'Content-Type': mimeType(resourcePath) });
            res.end(data);
        }
    });
}

function mimeType(path) {
    var p = path.toLowerCase();

    if (p.endsWith('.js'))
        return 'application/javascript';
    else if (p.endsWith('.html'))
        return 'text/html';
    else if (p.endsWith('.css'))
        return 'text/css';
    else
        return 'text/plain';
}

const hostname = '0.0.0.0';
const port = 3000;

httpServer.listen(port, hostname, () => {
    console.log(`HTTP server running at http://${hostname}:${port}/`);
});

module.exports = {http: httpServer, ws: wsServer};
