var sqlite3 = require('sqlite3');
var db = new sqlite3.Database('database.db');

var restify = require('restify');
var server = restify.createServer({agent: false });

server.pre(restify.pre.userAgentConnection());

server.use(restify.queryParser({
  mapParams: false
}));
server.use(restify.bodyParser({
  mapParams:false
}));

var resources = ['./bookmarkResource.js'];

resources.forEach(item => require(item).setup(server,db));

server.listen({port:80,host:"127.0.0.2"}, function() {
  console.log('%s listening at %s', server.name, server.url);
});
