var path = require('path');
var archive = require('../helpers/archive-helpers');
var httpHelpers = require('./http-helpers.js');
var fs = require('fs');
// require more modules/folders here!

exports.handleRequest = function (req, res) {
  var publicF;

  if (req.method === 'GET') {
    if (req.url === '/') {
      var index = __dirname + '/public/index.html';
      //SERVER ONLY index
      httpHelpers.serveAssets(res, index, fs.readFile);
    } else if (req.url === '/styles.css') {
      httpHelpers.serveAssets(res, __dirname + '/public/styles.css', fs.readFile, true);
    } else {
      var archiveUrl = archive.paths.archivedSites + req.url;
      archive.isUrlArchived(req.url, function(doesExist) {
        if (doesExist) {
          console.log("TRYING TO LOAD", archiveUrl)
          httpHelpers.serveAssets(res, archiveUrl, fs.readFile);
        } else {
          console.log("IM FALSE, should load load.html");
          httpHelpers.serveAssets(res, archive.paths.siteAssets + '/loading.html', fs.readFile);
        }
      });
   
    }
  } else if (req.method === 'POST') {
    httpHelpers.collectData(req, archive.addUrlToList, res);
    // httpHelpers.collectData(req);
    // console.log(data, '-----------DATA')
    // archive.isUrlInList(data, function(doesExist) {
    //   if (!doesExist) {
    //     archive.addUrlToList(data);
    //     httpHelpers.sendResponse(res, null, 302);
    //   } 
    // });
    // httpHelpers.sendResponse(res, null, 302);


  } else {
    httpHelpers.sendResponse(res, null, 404);
  } 

  
  // res.end(archive.paths.list);
};
