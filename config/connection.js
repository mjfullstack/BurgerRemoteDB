// NPM package
var mysql = require("mysql");
var env = require("env");

console.log("FILE: connection.js ACTIVE");

// Database Connection
var connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  // password: config.password,
  password: process.env.SQLPASS,
  database: "burgers_db"
});

connection.connect(function(err) {
  if (err) {
    console.error("error connecting: " + err.stack);
    return;
  }
  console.log("connected as id " + connection.threadId);
});

module.exports = connection;

