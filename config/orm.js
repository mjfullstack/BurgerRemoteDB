// NPM / Requires
var connection = require("../config/connection.js");

console.log("FILE: orm.js ACTIVE");

module.exports =  {
  // c-r-U-d: UPDATE
  updateOne : function (dbID, res) {
    console.log('ORM - dbID: ', dbID);
    var myQuery = connection.query(
      "UPDATE burgers SET ? WHERE ?",
      [
        {
          devoured: 1
        },
        {
          id: dbID
        }
      ],
      function(err, response) {
        console.log('updateOne - myQuery:', myQuery.sql);
        console.log('updateOne - response:', response);
        console.log("\n" + response.affectedRows + " Burgers updated!\n");
        res.status(200).json(dbID)
      }
    );
  },

  // C-r-u-d: CREATE
  insertOne : function (dbDES, res) {
    console.log('ORM - dbDES: ', dbDES);

    var myQuery = connection.query(
      "INSERT INTO burgers SET ?",
        { burger_name: dbDES,
          devoured:    0
        },
      function(err, response) {
        console.log('myQuery:', myQuery.sql);
        console.log('response.insertId:', response.insertId);
        console.log('response:', response);
        console.log("\n" + response.affectedRows + " Burgers updated!\n");
        res.status(200).json(response.insertId).end();
      }
    );
  },

  // c-R-ud: READ
  selectAll : function (req, res) {
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
      
            res.render("index", { // Object being passed to render for HANDLEBARS can work with it.
              want_devour: result1,
              did_devour: result2
            });
        });
    });
  }
} 

