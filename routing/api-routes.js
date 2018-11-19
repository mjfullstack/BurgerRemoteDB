// NPM Stuff!
var mysql = require("mysql");
var path = require("path");
// var burgerDevoured = require(__dirname + '/../data/burgers-table.js')
// var burgerDevoured = require(__dirname);

console.log("FILE: api-routes.js ACTIVE");
// console.log(burgerDevoured);

module.exports = function(app, connection) {

  function updateBurger(req, res) {
    console.log("Updating Devoured State...\n");
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
        // getAllBurgers(req, res);
      }
    );
  };

  function addNewBurger(req, res) {
    console.log("Adding NEW Burger and Devoured State...\n");
    var burgerDes = req.params.burgertext;
    console.log("Echo back request...");
    // res.json(burgerID);
    console.log('burgerDes: ', burgerDes);

    var myQuery = connection.query(
      // "INSERT INTO burgers (burger_name, devoured) VALUES (burgerDesc, 0)",
      "INSERT INTO burgers SET ?",
        { burger_name: burgerDes,
          devoured:    0
        },
      function(err, response) {
        console.log('myQuery:', myQuery.sql);
        console.log('response.body:', response.body);
        console.log('response:', response);
        console.log("\n" + response.affectedRows + " Burgers updated!\n");
        res.status(200).json(burgerID)
        // getAllBurgers(req, res);
        // Not recommended Anyway!!!
        // response.redirect('/'); // Not a FrontEnd function

      }
    );
  };

  function getAllBurgers(req, res) {
    console.log("Retrieving All Burgers...\n");
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
      
            // return res.render("both_devs", { // Object being passed to render for HANDLEBARS can work with it.
            res.render("both_devs", { // Object being passed to render for HANDLEBARS can work with it.
              want_devour: result1,
              did_devour: result2
            });
          });
    });
  };
    



  // GET ROUTE
  app.get('/devoured/:id', function(req, res) {
    console.log("app.GET/devoured in api-routes.js got hit!");
    // res.json(burgerDevoured);
    console.log( 'req.body: ', req.body);
    getAllBurgers(req, res);
  });

  app.get('/devoured', function(req, res) {
    console.log("app.GET/devoured in api-routes.js got hit!");
    // res.json(burgerDevoured);
    console.log( 'GET - DEVOURED... req.body: ', req.body);
    getAllBurgers(req, res);
  });

  // c-R-ud: READ
  app.get("/", function(req, res) {
    console.log("app.GET/ in api-routes just got hit!")
    getAllBurgers(req, res);
  });


  // POST ROUTES
  // c-r-U-d: UPDATE
  app.put('/devoured/:id', function(req, res) {
    console.log("app.PUT in api-routes.js got hit!");
    updateBurger(req, res);
  });

    // C-r-u-d: CREATE
    app.post('/addnew/:burgertext', function(req, res) {
      console.log("app.POST in api-routes.js got hit!");
      addNewBurger(req, res);
    });
};