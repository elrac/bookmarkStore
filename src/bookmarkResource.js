exports.setup = function(server, db){

  var getBookmarks = function(req,res,next){
    db.all('select * from bookmark',function(err, data){
      console.log(data);
      res.send(data);
      next();
    });
  }


  server.get('/bookmark',getBookmarks);
  server.get('/',getBookmarks);
}
