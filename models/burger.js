// NPM / Requires
var orm = require("../config/orm.js");

console.log("FILE: burger.js ACTIVE");
// This vile file calls hjomegrown ORM or will change to call Sequelize functions

module.exports = {

  // c-r-U-d: UPDATE
  updateBurger : function(req, res) {
    console.log("Updating Devoured State...\n");
    var burgerID = req.params.id;
    console.log('burgerID: ', burgerID);
    orm.updateOne(burgerID, res);
  },

  // C-r-u-d: CREATE
  addNewBurger : function (req, res) {
    console.log("Adding NEW Burger and Devoured State...\n");
    var burgerDes = req.params.burgertext;
    console.log('burgerDes: ', burgerDes);
    orm.insertOne(burgerDes, res);
  },

  // c-R-ud: READ
  getAllBurgers : function (req, res) {
    console.log("Retrieving All Burgers...\n");
    // Get list of ones WANT to devour
    console.log("BURGER.JS - connection...", "\n");
    orm.selectAll(req, res);
  },
};

