var sqlite3 = require('sqlite3');
var db = new sqlite3.Database('database.db');

db.serialize(function() {

  db.run("CREATE TABLE bookmark (title TEXT, url TEXT, description TEXT, date TEXT )");

  var stmt = db.prepare("INSERT INTO bookmark VALUES (?,?,?,?)");

  stmt.run('title 1','google.com','a description', new Date());
  stmt.run('title 2','reddit.com','a description', new Date());
  stmt.run('title 3','yahoo.com','a description', new Date());
  stmt.run('title 4','facebook.com','a description', new Date());
  stmt.run('title 5','fark.com','a description', new Date());

  stmt.finalize();

});

db.close();
