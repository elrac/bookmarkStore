var fs = require('fs');

if (fs.existsSync('database.db')) {
    fs.unlinkSync('database.db');
}

var sqlite3 = require('sqlite3');
var db = new sqlite3.Database('database.db');

db.serialize(function() {
  db.run("PRAGMA foreign_keys = ON");


  db.run("CREATE TABLE bookmark (bookmark_id INTEGER PRIMARY KEY ASC, title TEXT, url TEXT, description TEXT, date TEXT )");

  var stmt = db.prepare("INSERT INTO bookmark (title,url,description,date) VALUES ($title,$url,$description,$date)");

  var data = [
    {$title:'Google',$url:'https://www.google.com',$description:'a description',$date:new Date()},
    {$title:'Reddit',$url:'https://www.reddit.com',$description:'a description',$date:new Date()},
    {$title:'Yahoo',$url:'yahoo.com',$description:'a description',$date:new Date()},
    {$title:'Facebook',$url:'facebook.com',$description:'a description',$date:new Date()},
    {$title:'Fark',$url:'fark.com',$description:'a description',$date:new Date()},
  ];

  for(var i=0;i<data.length;i++){
    stmt.run(data[i],function(err){
      console.log('id',this.lastID);
    });
  }

  stmt.finalize();

  db.all('select * from bookmark', (err, data) => console.log(data));

});

db.close();
