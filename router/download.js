let express = require('express');
let apirouter = express.Router();

var fs = require('fs'),
    request = require('request');

var download = function(uri, filename, callback){
  request.head(uri, function(err, res, body){
    console.log('content-type:', res.headers['content-type']);
    console.log('content-length:', res.headers['content-length']);

    request(uri).pipe(fs.createWriteStream(filename)).on('close', callback);
  });
};

// download('https://my1.1stkmgv1.com/manga_5f818d184f09c/96dd57f7783f0510368a79d4d58bb6a1/1.jpg', 'google.png', function(){
//   console.log('done');
// });
module.exports = apirouter;