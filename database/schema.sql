DROP DATABASE IF EXISTS photocarousel;
CREATE DATABASE photocarousel;

\c photocarousel;

USE photocarousel;

CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  name varchar(255) not null,
  avatar_url varchar(255),
  friendCount smallint DEFAULT 0, 
  starCount smallint DEFAULT 0,
  eliteYear smallint DEFAULT NULL
);

-- CREATE TABLE friends (
--   id INT AUTO_INCREMENT NOT NULL,
--   friendsCount INT NOT NULL,
--   userId INT DEFAULT 0,
--   FOREIGN KEY (friendsId) REFERENCES users(id)
-- )

CREATE TABLE restaurants (
  id SERIAL PRIMARY KEY,
  name varchar(255) not null,
  owner int
);

-- CREATE TABLE votes (
--   id INT AUTO_INCREMENT NOT NULL,
--   helpful INT,
--   unhelpful INT,
--   imageId INT,
--   FOREIGN KEY (imageId) REFERENCES images(id),
-- )

CREATE TABLE images (
  id SERIAL PRIMARY KEY,
  img_url varchar(150) not null,
  title varchar(255),
  createdAt date not null,
  user smallint,
  upvotes smallint, 
  downvotes smallint, 
  restaurant_id INT,
  FOREIGN KEY (restaurant) REFERENCES restaurants(id),
  FOREIGN KEY (user) REFERENCES users(id)
);

CREATE INDEX idx_restaurant_id ON images USING HASH (restaurant_id);



/*  Execute this file from the command line by typing:
 *    mysql -h localhost -u user -p < ./database/schema.sql
 *  to create the database and the tables.*/

