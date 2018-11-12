var express = require("express");
var bodyParser = require("body-parser");
var mysql = require("mysql");
var path = require('path');
var config = require("./config.js");

var app = express();
var PORT = process.env.PORT || 3000;

// MIDDLEWARE --- Sets up the Express app to handle data parsing
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
// This app.use is required because we need to open up the "static"
// resources and open it to the public. Normally, a website will use
// resources that are "dynamic" and exist elsewhere. In this case,
// our resources all reside in the same place so we just need to tell
// it so.
app.use((express.static(path.join(__dirname,"./public"))));
var exphbs = require("express-handlebars");

// HANDLEBARS When needed
app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

// Database Connection - if needed
          // var connection = mysql.createConnection({
          //   host: "localhost",
          //   port: 3306,
          //   user: "root",
          //   password: config.password,
          //   database: "friends_db"
          // });

          // connection.connect(function(err) {
          //   if (err) {
          //     console.error("error connecting: " + err.stack);
          //     return;
          //   }
          //   console.log("connected as id " + connection.threadId);
          // });

// Required Server Files
var htmlRoutes = require("./routing/html-routes.js")(app);
var apiRoutes = require("./routing/api-routes.js")(app);
// var friendData = require("./data/friends-table.js");

// Express and MySQL code should go here.
// app.get("/", function(req, res) {
//   connection.query("SELECT * FROM friends_db.friends",
//   function (err, data) {
//     if (err) {
//       console.log(err);
//       throw err;
//     }
//     res.render( "index", {quotes:data});
//   })
// })

// app.get("/:id", function(req, res) {
//   var qID = req.params.id;

//   connection.query("SELECT * FROM quotes_db.quotes WHERE ?",
//   {id:qID}, function(err, data) {
//     console.log(data);
//     // res.json(data);
//     res.render("single-quote", {
//     id:data[0].id,
//     author: data[0].author,
//     quote: data[0].quote,
//     heading: "Just One Quote..."
//     });
//   })
// })



// app.post("~/api/")
// Start our server so that it can begin listening to client requests.
app.listen(PORT, function() {
  // Log (server-side) when our server has started
  console.log("Server listening on: http://localhost:" + PORT);
});
