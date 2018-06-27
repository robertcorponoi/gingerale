'use strict'

const app = require('http').createServer(handler);
const url = require('url');
const path = require('path');
const fs = require('fs');
const port = 8888;

const contentTypes = {
  html: 'text/html',
  css: 'text/css',
  js: 'text/javascript',
  png: 'image/png'
};

app.listen(port);
console.log(`Static file server running at http://localhost:${port}/\nCTRL + C to shutdown`);

/**
 * Handle all static page requests made to the http server by checking
 * if the files exist and assigning the correct content type headers
 * before serving them.
 * 
 * @param {Object} req - The http request object.
 * @param {Object} res - The http response object.
 */
async function handler(req, res) {
  const uri = url.parse(req.url).pathname;
  let filename = path.join(process.cwd(), uri);

  let fileExists = await exists(filename).catch(() => reject(res));
  if (fileExists.isDirectory()) filename = `${filename}\\test\\gingerale.html`;

  let readFile = await read(filename).catch((err) => reject(res, 500, err));

  let headers = {};
  let contentType = contentTypes[path.extname(filename).replace(".", "")];
  headers['Content-Type'] = contentType;

  res.writeHead(200, headers);
  res.write(readFile, 'binary');
  res.end();
}

/**
 * Simply wraps fs.stat in a promise for asynchronous operation.
 * Reject does not return any information as the file existing should lead to a 404 anyways.
 * 
 * @param {string} file - The path to a file to check if it exists.
 * @returns {Promise}
 */
const exists = function checkFileExistsAysnc(file) {
  return new Promise((resolve, reject) => {
    fs.stat(file, (err, stat) => {
      if (err) reject();
      resolve(stat);
    });
  });
}

/**
 * Simply wraps fs.readFile in a promise for asynchronous operation.
 * Just as with exists(), the reject does not return anything as it should lead to a 500 error in use.
 * 
 * @param {string} file - The path to a file to read.
 * @returns {Promise}
 */
const read = function readFileAsync(file) {
  return new Promise((resolve, reject) => {
    fs.readFile(file, "binary", (err, data) => {
      if (err) reject();
      resolve(data);
    });
  });
}

/**
 * A template for bad server requests for issues like file not existing.
 * This automatically sends the bad request and ends it so nothing else needs
 * to be done after this is called.
 * 
 * @param {Object} res - The http response object.
 * @param {number} [code=404] - The http status code associated with the error.
 * @param {Error|string} [err='404 Not Found'] - The error to show on the page, defaults to 404.
 */
const reject = function returnBadRequest(res, code = 404, err = '404 Not Found') {
  res.writeHead(code, { 'Content-Type': 'text/plain' });
  res.write(`${err}\n`);
  res.end();
  return;
}