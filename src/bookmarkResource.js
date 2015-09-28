exports.setup = function(server, db){


  server.get('/bookmarks',function(req,res,next){
    db.all('select * from bookmark',function(err, res){
      console.log(res);
    });
  });
}
