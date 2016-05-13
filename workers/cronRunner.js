
var archive = require('../helpers/archive-helpers.js');
var htmlfetcher = require('./htmlfetcher.js');
var cron = require('cron');

// var cronJob = cron.job('*/10 * * * * *', function () {
  htmlfetcher.getList(archive.downloadUrls);
//   console.log('crom complete');
  
// });

// cronJob.start();
