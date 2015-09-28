var sqlite3 = require('sqlite3');
var db = new sqlite3.Database('database.db');

var restify = require('restify');
var server = restify.createServer();

server.pre(restify.pre.userAgentConnection());



var resources = ['./bookmarkResource.js'];

resources.forEach(function(item){
    require(item).setup(server,db);
});


server.listen(8080, function() {
  console.log('%s listening at %s', server.name, server.url);
});
