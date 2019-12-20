DROP DATABASE IF EXISTS photocarousel;
CREATE DATABASE photocarousel;

USE photocarousel;

CREATE TABLE users (
  id INT AUTO_INCREMENT NOT NULL,
  name VARCHAR(255) NOT NULL,
  avatar_url VARCHAR(255),
  -- friendCount INT DEFAULT 0, 
  starCount INT DEFAULT 0,
  eliteYear date DEFAULT NULL, 
  PRIMARY KEY (id)
);

CREATE TABLE friends (
  id INT AUTO_INCREMENT NOT NULL,
  friendsCount INT NOT NULL,
  userId INT DEFAULT 0,
  FOREIGN KEY (friendsId) REFERENCES users(id)
)

CREATE TABLE restaurants (
  id INT AUTO_INCREMENT NOT NULL,
  name VARCHAR(255) NOT NULL,
  ownerId INT,
  PRIMARY KEY (id),
  FOREIGN KEY (ownerId) REFERENCES users(id)
);

CREATE TABLE votes (
  id INT AUTO_INCREMENT NOT NULL,
  helpful INT,
  unhelpful INT,
  imageId INT,
  FOREIGN KEY (imageId) REFERENCES images(id),
)

CREATE TABLE images (
  id INT AUTO_INCREMENT NOT NULL,
  img_url VARCHAR(255) NOT NULL,
  title VARCHAR(255),
  createdAt TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP,
  locationId INT,
  ownerId INT,
  caption VARCHAR(255),
  -- upvotes INT, 
  -- downvotes INT, 
  PRIMARY KEY (id),
  FOREIGN KEY (locationId) REFERENCES locations(id),
  FOREIGN KEY (ownerId) REFERENCES users(id)
);



/*  Execute this file from the command line by typing:
 *    mysql -h localhost -u user -p < ./database/schema.sql
 *  to create the database and the tables.*/

