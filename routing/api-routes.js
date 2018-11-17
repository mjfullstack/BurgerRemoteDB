// NPM Stuff!
var mysql = require("mysql");
var path = require("path");
// var burgerDevoured = require(__dirname + '/../data/burgers-table.js')
// var burgerDevoured = require(__dirname);

console.log("FILE: api-routes.js ACTIVE");
// console.log(burgerDevoured);

module.exports = function(app, connection) {

  function updateBurger(burgerID) {
    console.log("Updating Devoured State...\n");

  };

  function getAllBurgers() {
    console.log("Retrieving All Burgers...\n");
    
  };
    



  // GET ROUTE
  app.get('/devoured', function(req, res) {
    console.log("app.get in api-routes.js got hit!");
    // res.json(burgerDevoured);
    comsole.log( 'burgerDevoured: ', burgerDevoured);
  });

  // c-R-ud: READ
app.get("/", function(req, res) {

  // Get list of ones WANT to devour
  var myQuery1 = connection.query(
  "SELECT * FROM burgers_db.burgers WHERE ?", { devoured: 0 }, function(err, result1) {
    if (err) { console.log(err); throw err; };
    // Get list of ones DEVOURED
    var myQuery2 = connection.query(
      "SELECT * FROM burgers_db.burgers WHERE ?", { devoured: 1 }, function(err, result2) {
      if (err) { console.log(err); throw err; };
      // logs the actual query being run 
      console.log(myQuery1.sql);
      console.log(myQuery2.sql);
      // Log all results of the SELECT statement
      console.log(result1);
      console.log(result2);

      return res.render("both_devs", { // Object being passed to render for HANDLEBARS can work with it.
        want_devour: result1,
        did_devour: result2
      });
    });
  });
});


  // POST ROUTE
  app.post('/devoured/:id', function(req, res) {
    console.log("app.post in api-routes.js got hit!");
    var burgerID = req.params.id;
    console.log("Echo back request...");
    // res.json(burgerID);
    console.log('burgerID: ', burgerID);

    var myQuery = connection.query(
      "UPDATE burgers SET ? WHERE ?",
      [
        {
          devoured: 1
        },
        {
          id: burgerID
        }
      ],
      function(err, response) {
        console.log('myQuery:', myQuery.sql);
        console.log('res:', response);
        console.log("\n" + response.affectedRows + " Burgers updated!\n");
        res.status(200).json(burgerID)
        // return res.render("both_devs", { // Object being passed to render for HANDLEBARS can work with it.
        //   want_devour: result1,
        //   did_devour: result2
        // });
      }
    );
  

  });
};