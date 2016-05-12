var path = require('path');
var fs = require('fs');
var archive = require('../helpers/archive-helpers');

exports.headers = {
  'access-control-allow-origin': '*',
  'access-control-allow-methods': 'GET, POST, PUT, DELETE, OPTIONS',
  'access-control-allow-headers': 'content-type, accept',
  'access-control-max-age': 10, // Seconds.
  'Content-Type': 'text/html'
};

var contType = {
  css: {'Content-Type': 'text/css'},
  html: {'Content-Type': 'text/html'},
  js: {'Content-Type': 'text/javascript'}
};

exports.serveAssets = function(res, pathFile, callback, areucss) {
  // Write some code here that helps serve up your static files!
  // (Static files are things like html (yours or archived from others...),
  // css, or anything that doesn't change often.)
  // var publicFArr = ['index.html', 'loading.html', 'styles.css'];
  if (areucss) {
    callback(pathFile, function(error, content) {
      if (error) {
        res.writeHead(500);
        res.end();
      } else {
        res.writeHead(200, {'Content-Type': 'text/css'});
        res.end(content, 'utf-8');
      }
    }); 
  } else {
    callback(pathFile, function(error, content) {
      if (error) {
        res.writeHead(500);
        res.end();
      } else {
        res.writeHead(200, this.headers);
        res.end(content, 'utf-8');
      }
    });
  }



};
//GET
exports.sendResponse = function(res, filepath, statusCode) {
  statusCode = statusCode || 200;
  res.writeHead(statusCode, this.headers);
  res.end(JSON.stringify(filepath));
};

exports.collectData = function(request, callback, res) {
  var data = '';
  request.on('data', function(chunk) {
    data += chunk;
  });
  request.on('end', function() {
    data = (data.slice(4)) + '\n';
    callback(data, archive.isUrlInList, res);

  });
};

// As you progress, keep thinking about what helper functions you can put here!
