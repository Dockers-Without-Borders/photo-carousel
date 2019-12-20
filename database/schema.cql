CREATE KEYSPACE photocarousel
  WITH replication = { 'class:' 'SimpleStrategy', 'replication_factor': 3 }

CREATE TABLE users (
  userId int
  name text
  avatar_url text
  starCount int
  eliteYear date 
  PRIMARY KEY(userId, name) 
);

CREATE TABLE friends (
  user text
  friendsCount int
  PRIMARY KEY(user)
)

CREATE TABLE restaurants (
  restaurantId int
  name text
  ownerId int
  PRIMARY KEY(restaurantId, name)
);

CREATE TABLE votes (
  id int
  helpful int
  unhelpful int
  imageId text
  PRIMARY KEY(imageId)
)

CREATE TABLE images (
  imageId int
  img_url text,
  title text,
  createdAt timestamp,
  restaurant text,
  owner text,
  caption text,
  PRIMARY KEY (restaurant, imageId),
);