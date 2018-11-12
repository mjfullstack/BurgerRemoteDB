// NPM Stuff!
var path = require("path");
// var friendObj = require(__dirname + '/../data/friends-table.js')

console.log("FILE: api-routes.js ACTIVE");
// console.log(friendObj);

module.exports = function(app) {
  // GET ROUTE
  app.get('/api/friendlist', function(req, res) {
    console.log("app.get in api-routes.js got hit!");
    // res.json(friendObj);
  });

  // POST ROUTE
  app.post('/survey', function(req, res) {
    console.log("app.post in api-routes.js got hit!");
    console.log("Echo back request...");
    // res.json(req.body);
    console.log(req.body);

  });
};