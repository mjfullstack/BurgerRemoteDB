// NPM / Requires
var express = require("express");
var burger = require("../models/burger.js")
var orm = require("../config/orm.js");

console.log("FILE: burgers_controller.js ACTIVE");

module.exports = function(app) {
  // -------------------------
  // GET ROUTE
  // -------------------------
  // c-R-ud: READ
  app.get("/", function(req, res) {
    console.log("app.GET/ in burgers_controller-routes just got hit!");
    burger.getAllBurgers(req, res);
  });

  // -------------------------
  // POST ROUTES
  // -------------------------
  // c-r-U-d: UPDATE
  app.put('/devoured/:id', function(req, res) {
    console.log("app.PUT in burgers_controller-routes.js got hit!");
    burger.updateBurger(req, res);
  });

  // C-r-u-d: CREATE
  app.post('/addnew/:burgertext', function(req, res) {
    console.log("app.POST in burgers_controller-routes.js got hit!");
    // burger.addNewBurger(req, res);
    burger.addNewBurger(req, res);
  });






















  // NPM / Requires
// var controller = require("../controllers/burgers_controller.js")

// console.log("FILE: burger.js ACTIVE");

// var burger = function (req, res) {

  // c-r-U-d: UPDATE
  function updateBurger(burgers_controller, req, res) {
    console.log("Updating Devoured State...\n");
    var burgerID = req.params.id;
    console.log('burgerID: ', burgerID);
    orm.updateOne(burgerID, res);
  };

  // C-r-u-d: CREATE
  function addNewBurger(req, res) {
    console.log("Adding NEW Burger and Devoured State...\n");
    var burgerDes = req.params.burgertext;
    console.log('burgerDes: ', burgerDes);
    orm.insertOne(burgerDes, res);
  }

  // c-R-ud: READ
  function getAllBurgers(req, res) {
    console.log("Retrieving All Burgers...\n");
    // Get list of ones WANT to devour
    console.log("BURGER.JS - connection...", "\n");
    
    orm.selectAll(req, res);
  }
};

//   module.exports = burger;

// };