var fs = require('fs');

exports.setup = function(server, db,restify){
  // any path that has a period in it is considered content
  // server.get(/(\/$|.*\..*)/,function(req,res,next){
  //   console.log(req.params);
  //   res.send(200);
  //   next();
  // });


   server.get(/(\/$|.*\..*)/,
  restify.serveStatic({
    directory: 'content',
    default: 'bookmarks.html',
    maxAge:0
  }));


}
