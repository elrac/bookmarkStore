var fs = require('fs');

exports.setup = function(server, db,restify){
  // any path that has a period in it is considered content
  server.get(/(\/|.*\..*)/,restify.serveStatic({
    directory: 'content',
    default: 'bookmarks.html',
    maxAge:0
  }));
}
