const http = require('http');
const fs = require('fs');
//const fsPromises = require('fs/promises');
const path = require('path');

const server = http.createServer(async (req, res) => {
    const baseDirectory = 'C:/Users/Narcis Navarro/Desktop/DAM2/MP16/NarcisNavarro_M16/PROJECTE_DEF/';

    if (req.url.endsWith('.html')) {
        const filePath = path.join(baseDirectory, req.url);

        // Check if the file exists
        fs.access(filePath, fs.constants.F_OK, (err) => {
            if (err) {
                res.writeHead(404, { 'Content-Type': 'text/plain' });
                res.end('404 Not Found');
            } else {
                const stream = fs.createReadStream(filePath, 'utf-8');
                res.writeHead(200, { 'Content-Type': 'text/html' });
                stream.pipe(res);
            }
        });
    } else if (req.url.endsWith('.css')) {
        const cssPath = path.join('C:/Users/Narcis Navarro/Desktop/DAM2/MP16/NarcisNavarro_M16/PROJECTE_DEF/', req.url);
        const stream = fs.createReadStream(cssPath, 'utf-8');
        res.writeHead(200, { 'Content-Type': 'text/css' });
        stream.pipe(res);
    } else if (req.url.endsWith('.jpg')) {
        const jpgPath = path.join('C:/Users/Narcis Navarro/Desktop/DAM2/MP16/NarcisNavarro_M16/PROJECTE_DEF/', req.url);
        const stream = fs.createReadStream(jpgPath);
        res.writeHead(200, { 'Content-Type': 'image/jpeg' });
        stream.pipe(res);
    } else if (req.url.endsWith('.png')) {
        const pngPath = path.join('C:/Users/Narcis Navarro/Desktop/DAM2/MP16/NarcisNavarro_M16/PROJECTE_DEF/', req.url);
        const stream = fs.createReadStream(pngPath);
        res.writeHead(200, { 'Content-Type': 'image/png' });
        stream.pipe(res);
    } else {
        res.writeHead(404, { 'Content-Type': 'text/plain' });
        res.end('404 Not Found');
    }
});

server.listen(3000, () => {
    console.log('Server is listening on port 3000');
});