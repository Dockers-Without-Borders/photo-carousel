var { pool } = require('./index.js');

pool.query(`DROP DATABASE IF EXISTS photocarousel;`)
  .then(() => {
    return pool.query(`CREATE DATABASE photocarousel;`)
  })
  .catch((err) => {
    console.log(`Error creating database: ${err}`);
  })
  .then(() => {
    pool.end();
    pool = new Pool({
      host: 'localhost',
      user: 'alextian',
      database: 'photocarousel',
    });
  })
  .then(() => {
    return pool.query(`DROP TABLE IF EXISTS restaurants;`)
  })
  .then(() => {
    return pool.query(`DROP TABLE IF EXISTS images;`)
  })
  .then(() => {
    return pool.query(`DROP TABLE IF EXISTS users;`)
  })
  .catch((err) => {
    console.log(`Error dropping tables: ${err}`)
  })
  .then(() => {
    return pool.query(`CREATE TABLE users (
      id SERIAL PRIMARY KEY,
      user_name VARCHAR (50),
      starCount SMALLINT,
      friendCount SMALLINT,
      avatar_url TEXT,
      eliteYear SMALLINT
    );`)
  })
  .then(() => {
    return pool.query(`CREATE TABLE restaurants (
      id SERIAL PRIMARY KEY,
      name TEXT,
      owner_id INTEGER
    );`)
  })
  .then(() => {
    return pool.query(`CREATE TABLE images (
      id SERIAL PRIMARY KEY,
      image_url TEXT,
      upvotes SMALLINT,
      downvotes SMALLINT,
      created_at DATE NOT NULL DEFAULT CURRENT_DATE,
      user_id INTEGER,
      caption TEXT,
      restaurant_id INTEGER
    );`)
  })
  .then(() => {
    return pool.query(`CREATE INDEX idx_restaurant_id ON images USING HASH (restaurant_id)`)
  })
  .then(() => {
    console.log(`finished initializing database`);
  })
  .catch((err) => {
    console.log(`Error creating tables: ${err}`)
  })

  module.exports= {
    pool: pool
  }