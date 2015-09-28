exports.setup = function(server, db){


  server.get('/bookmarks',function(req,res,next){
    db.all('select * from bookmark',function(err, data){
      console.log(data);
      res.send(data);
      next();
    });
  });
}
