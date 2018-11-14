### Schema ###
DROP DATABASE IF EXISTS burgers_db;
CREATE DATABASE burgers_db;
USE burgers_db;

CREATE TABLE burgers
(
	id INT NOT NULL AUTO_INCREMENT,
	burger_name varchar(255) NOT NULL,
	devoured BOOLEAN DEFAULT FALSE,
  burp_time TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
	PRIMARY KEY (id)
);


### SEEDS ###
INSERT INTO burgers (burger_name, devoured) VALUES ("Western Bacon Double Cheeseburger", "FALSE");
INSERT INTO burgers (burger_name, devoured) VALUES ("Five Guys Double Cheeseburger", "FALSE");
INSERT INTO burgers (burger_name, devoured) VALUES ("Burger King Chicken Sandwich", "FALSE");

