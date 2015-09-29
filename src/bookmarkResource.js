exports.setup = function(server, db){

  var getBookmarks = function(req,res,next){
    db.all('select * from bookmark',function(err, data){
      console.log(data);
      res.send(data);
      next();
    });
  }

  server.get('/bookmarks',getBookmarks);
  server.get('/',getBookmarks);

  var postBookmarks = function(req,res,next){

    console.log('params',req.params);
    console.log('body',req.body);
    console.log('query',req.query);

    var data = req.body;

    if(!data.url){
      console.log('no url in data',data);
      res.send(422,"could not insert bookmark, url required");
      next();
      return;
    }

    var insertData = {
      $title:data.title,
      $url:data.url,
      $description:data.description,
      $date:new Date()
    }

    db.run('INSERT INTO bookmark (title,url,description,date) VALUES ($title,$url,$description,$date)',insertData,
      function(err){
        if(err){
          console.log('error while inserting value',err);
          res.send(422,"could not insert bookmark");
        }else{
          res.send({id:this.lastID});
        }

        next();
    });
  }

  server.post('/bookmarks',postBookmarks);

  var postBookmark = function(req,res,next){
    console.log('params',req.params);
    console.log('body',req.body);
    console.log('query',req.query);

    var postData = req.body;


    db.get('SELECT * FROM bookmark WHERE bookmark_id = $id',{$id:req.params.bookmarkId},
    function(err,data){
      if(err){
        console.log("bookmark doesn't exist id:",eq.params.bookmarkId);
        res.send(404,'bookmark not found');
        next();
        return;
      }

      console.log('selected data',data);

      var updateData = {
        $id:data.bookmark_id,
        $title:data.title,
        $url:data.url,
        $description:data.description
      }

      if(postData.title){
        updateData.$title = postData.title;
      }

      if(postData.url){
        updateData.$url = postData.url;
      }

      if(postData.description){
        updateData.$description = postData.description;
      }

      console.log('update object',updateData);

      db.run('UPDATE bookmark SET title=$title, url=$url, description=$description WHERE bookmark_id = $id',
      updateData,function(err,data){

        if(err){
          console.log("error while saving bookmark. error:",err);
          res.send(500,'bookmark not saved');
        }else{
          res.send(200,"success");
        }

        next();

      });

    });
  }

  server.post('/bookmarks/:bookmarkId',postBookmark);

  var deleteBookmark = function(req,res,next){

    db.run('DELETE FROM bookmark WHERE bookmark_id = $id',{$id:req.params.bookmarkId},
    function(err){
      if(err){
        console.log("error while deleting bookmark. error:",err);
        res.send(500,'bookmark not deleted');
      }else{
        res.send(200,"success");
      }
      next();
    });
  }

  server.del('/bookmarks/:bookmarkId',deleteBookmark);

  server.get(/\/db\/(.*)/,function(req,res,next){
    console.log(req.params);
    res.send(req.params);
    next();
  });

}
