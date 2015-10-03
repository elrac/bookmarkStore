var fs = require('fs');

exports.setup = function(server, db,restify){

  // server.get(/(\/$|.*\..*)/,function(req,res,next){
  //   console.log(req.params);
  //   res.send(200);
  //   next();
  // });

  // any path that has a period in it is considered content
  // also / is content
  server.get(/(\/$|.*\..*)/,
  restify.serveStatic({
    directory: 'content',
    default: 'bookmarks.html',
    maxAge:0
  }));


}
