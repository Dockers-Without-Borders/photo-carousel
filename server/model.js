var { pool } = require('../database/index.js');
var Promise = require('bluebird');

Promise.promisifyAll(pool);

let model = {

  sampleQuery: function (restaurant_id) {
    let sampleQueryPromise = new Promise((resolve, reject) => {
      pool.queryAsync('SELECT * FROM images WHERE restaurant_id = ? LIMIT 10', [restaurant_id])
      .catch( err => {
        reject(err);
      })
      .then( results => {
        var data = [];
        for (var i = 0; i < results.length; i++){
          var obj = {
            'id': results[i].id,
            'img_url': results[i].img_url,
            'upvotes': results[i].upvotes,
            'downvotes': results[i].downvotes,
            'caption': results[i].caption,
            'created_at': results[i].created_at,
            'restaurant_id': results[i].restaurant_id, 
            'user_id': results[i].user_id
          };
          data.push(obj);
        }
        resolve(data);
      });
    });
    return sampleQueryPromise;
  },

  locationQuery: function (restaurant_id) {
    let restaurantQueryPromise = new Promise((resolve, reject) => {
      pool.queryAsync('SELECT * FROM restaurants WHERE id = ? LIMIT 1', [restaurant_id])
      .catch( err => {
        reject(err);
      })
      .then( result => {
        console.log(result);
        resolve(result);
      });
    });
    return restaurantQueryPromise;
  },

  // SELECT * FROM images INNER JOIN users ON images.user_id = users.id WHERE images.restaurant_id = ? limit 10
  imagesQuery: function (restaurant_id) {
    let imagesQueryPromise = new Promise((resolve, reject) => {
      console.log(restaurant_id);
      pool.queryAsync(`SELECT * FROM images INNER JOIN users ON images.user_id = users.id WHERE images.restaurant_id = ${restaurant_id} LIMIT 10`)
      .catch( err => {
        reject(err);
      })
      .then( results => {
        resolve(results);
      });
    });
    return imagesQueryPromise;
  },

};

module.exports = model;

// SELECT * FROM images INNER JOIN locations ON locationId = locations.id WHERE images.locationId = 2;
// SELECT * FROM images INNER JOIN users ON ownerId = users.id WHERE images.locationId = 2;
