var fs = require('fs');

if (fs.existsSync('database.db')) {
    fs.unlinkSync('database.db');
}



var sqlite3 = require('sqlite3');
var db = new sqlite3.Database('database.db');



db.serialize(function() {



  db.run("CREATE TABLE bookmark (bookmark_id INTEGER PRIMARY KEY ASC, title TEXT, url TEXT, description TEXT, date TEXT )");

  var stmt = db.prepare("INSERT INTO bookmark VALUES (?,?,?,?,?)");

  stmt.run(null, 'title 1', 'google.com', 'a description', new Date());
  stmt.run(null, 'title 2', 'reddit.com', 'a description', new Date());
  stmt.run(null, 'title 3', 'yahoo.com', 'a description', new Date());
  stmt.run(null, 'title 4', 'facebook.com', 'a description', new Date());
  stmt.run(null, 'title 5', 'fark.com', 'a description', new Date());

  stmt.finalize();


  db.all('select * from bookmark',function(err, data){
    console.log(data);
  });

});

db.close();
