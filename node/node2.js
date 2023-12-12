const http = require('http');
const fs = require('fs');
const path = require('path');
const url = require('url');

const baseDirectory = 'C:/Users/Narcis Navarro/Desktop/DAM2/MP16/NarcisNavarro_M16/PROJECTE_DEF/';

const server = http.createServer((req, res) => {
    const requestedUrl = url.parse(req.url, true);
    const filePath = requestedUrl.pathname === '/' ? path.join(baseDirectory, 'index.html') : path.join(baseDirectory, requestedUrl.pathname);

    if (req.url.endsWith('.html')) {
        fs.readFile(filePath, 'utf-8', (err, htmlContent) => {
            if (err) {
                res.writeHead(404, { 'Content-Type': 'text/plain' });
                res.end('404 Not Found');
            } else {
                // Buscar las imágenes en el HTML y servirlas
                const imageMatches = htmlContent.match(/<img[^>]*src="([^"]+)"[^>]*>/g);

                if (imageMatches) {
                    const imagePaths = imageMatches.map(match => {
                        const srcMatch = match.match(/src="([^"]+)"/);
                        return srcMatch ? srcMatch[1] : null;
                    });

                    const promises = imagePaths.map(imagePath => {
                        const fullImagePath = path.join(baseDirectory, imagePath);
                        return new Promise((resolve, reject) => {
                            fs.access(fullImagePath, fs.constants.F_OK, (err) => {
                                if (err) {
                                    reject(`Image not found: ${fullImagePath}`);
                                } else {
                                    const imageStream = fs.createReadStream(fullImagePath);
                                    imageStream.on('error', reject);
                                    res.writeHead(200, { 'Content-Type': 'image/jpeg' }); // Ajusta el tipo de contenido según tus necesidades
                                    imageStream.pipe(res);
                                    resolve();
                                }
                            });
                        });
                    });

                    Promise.all(promises)
                        .catch(error => {
                            res.writeHead(500, { 'Content-Type': 'text/plain' });
                            res.end(`500 Internal Server Error: ${error}`);
                        });
                } else {
                    // Si no hay imágenes en el HTML, servir solo el HTML
                    res.writeHead(200, { 'Content-Type': 'text/html' });
                    res.end(htmlContent);
                }
            }
        });
    } else if (req.url.endsWith('.css') || req.url.endsWith('.jpg') || req.url.endsWith('.png')) {
        fs.access(filePath, fs.constants.F_OK, (err) => {
            if (err) {
                res.writeHead(404, { 'Content-Type': 'text/plain' });
                res.end('404 Not Found');
            } else {
                const stream = fs.createReadStream(filePath);

                let contentType = 'application/octet-stream';
                if (req.url.endsWith('.css')) {
                    contentType = 'text/css';
                } else if (req.url.endsWith('.jpg')) {
                    contentType = 'image/jpeg';
                } else if (req.url.endsWith('.png')) {
                    contentType = 'image/png';
                }

                res.writeHead(200, { 'Content-Type': contentType });
                stream.pipe(res);
            }
        });
    } else {
        res.writeHead(404, { 'Content-Type': 'text/plain' });
        res.end('404 Not Found');
    }
});

server.listen(3000, () => {
    console.log('Server is listening on port 3000');
});