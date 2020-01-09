const { Pool } = require('pg');
const faker = require('faker');
const createCSVwriter = require('csv-writer').createObjectCsvWriter;
const path = require('path');

const pool = new Pool({
  user: 'alextian',
  database: 'photocarousel',
  port: 5432
});

let seedHelper = {
  getElite: function() {
    if (Math.random() < 0.8) {
      return null;
    } else {
      return 2010 + Math.floor(Math.random() * 10);
    }
  }
}

const USER_COUNT = 1000000;
const RESTAURANT_COUNT = 1000000;
const IMG_SAMPLE_COUNT = 1000000;

const userWriter = (data) => {
  let writer = createCSVwriter({
    path: `${path.resolve(__dirname, 'csv/userData.csv')}`,
    header: [
      {id: 'user_name', title: 'user_name'},
      {id: 'avatar_url', title: 'avatar_url'},
      {id: 'friendcount', title: 'friendount'},
      {id: 'starcount', title: 'starcount'},
      {id: 'eliteyear', title: 'eliteyear'}
    ]
  });
  return writer.writeRecords(data);
}

const restaurantWriter = (data) => {
  let writer = createCSVwriter({
    path: `${path.resolve(__dirname, 'csv/restaurantData.csv')}`,
    header: [
      {id: 'name', title: 'name'},
      {id: 'owner_id', title: 'owner_id'}
    ]
  });
  return writer.writeRecords(data);
}
  
const imageWriter = (data) => {
  let writer = createCSVwriter({
    path: `${path.resolve(__dirname, 'csv/imageData.csv')}`,
    header: [
      {id: 'image_url', title: 'image_url'},
      {id: 'upvotes', title: 'upvotes'},
      {id: 'downvotes', title: 'downvotes'},
      {id: 'user_id', title: 'user_id'},
      {id: 'caption', title: 'caption'},
      {id: 'restaurant_id', title: 'restaurant_id'}
    ]
  });
  return writer.writeRecords(data);
}
let csvSeed = {
  
  query: function (query) {
    let result = new Promise((resolve, reject) => {
      pool.query(query, function (err, resp) {
        if (err) {
          console.log('query failed: ', err)
          reject('query error', err);
        } else {
          console.log('success');
          resolve(resp);
        }
      })
    });
    return result;
  },

  seedUsersCSV: async function() {
    const userData = [];
    for (var i = 0; i < USER_COUNT; i++) {
      let user = {
        user_name: faker.name.firstName() + ' ' + faker.name.lastName(),
        avatar_url: faker.internet.avatar(),
        friendCount: Math.floor(Math.random() * 50),
        starCount: Math.floor(Math.random() * 100),
        eliteYear: seedHelper.getElite()
      }
      userData.push(user);
    }
    userWriter(userData);
  },

  seedRestaurantsCSV: async function() {
    const restaurantData = []
    const counter = 0;
    for (var i = 0; i < RESTAURANT_COUNT; i++) {
      let restaurant = {
        name : faker.address.streetName(),
        owner_id : Math.ceil(Math.random() * USER_COUNT)
      }
      restaurantData.push(restaurant)
    }
    restaurantWriter(restaurantData);
  },
  
  seedImagesCSV: async function() {
    const imageData = [];
    for (var i = 0; i < IMG_SAMPLE_COUNT; i++) {
      let image = {
        image_url: faker.image.imageUrl(),
        upvotes: Math.ceil(Math.random() * 10),
        downvotes: Math.ceil(Math.random() * 7),
        user_id: Math.ceil(Math.random() * USER_COUNT),
        caption: faker.commerce.productName(),
        restaurant_id: Math.ceil(Math.random() * RESTAURANT_COUNT)
      }
      imageData.push(image)
    }
    imageWriter(imageData);
  }
}


csvSeed.seedUsersCSV()
.then(() => {
  console.log('users seeded');
  csvSeed.seedRestaurantsCSV()
})
.then(() => {
  console.log('restaurants seeded');
  csvSeed.seedImagesCSV()
})
.then(() => {
  console.log('images seeded');
  console.log('importing CSV into database');
  let queryPromises = [];
  for (var i = 0; i < 10; i++) {
    queryPromises.push(csvSeed.query(`\COPY users(user_name,avatar_url,friendCount,starCount,eliteYear) FROM '${path.resolve(__dirname, 'csv/userData.csv')}' DELIMITER ',' CSV HEADER;`, `Users seeded ${i+1}million))`))
  }
  return Promise.all(queryPromises);
})
.then(() => {
  console.log(`finished importing users`);
  let queryPromises = [];
  for (var i = 0; i < 10; i++) {
    queryPromises.push(csvSeed.query(`\COPY restaurants(name, owner_id) FROM '${path.resolve(__dirname, 'csv/restaurantData.csv')}' DELIMITER ',' CSV HEADER;`, `Restaurants seeded ${i+1}million))`))
  }
  return Promise.all(queryPromises);
})
.then(() => {
  console.log('restaurants copied');
  let queryPromises = [];
  for (var i = 0; i < 100; i++) {
    queryPromises.push(csvSeed.query(`\COPY images(image_url, upvotes, downvotes, user_id, caption, restaurant_id) FROM '${path.resolve(__dirname, 'csv/imageData.csv')}' DELIMITER ',' CSV HEADER;`, `Images seeded ${i+1}million))`))
  }
  return Promise.all(queryPromises);
})
.catch((err) => {
  console.log(`failed at ${err}`);
})


// const aws_url = 'https://yelp-overview-gallery.s3-us-west-1.amazonaws.com/images/'


// let seed = {

//   seedUsers: function() {
//     let query = 'INSERT INTO users (name, avatar_url, friendCount, starCount, eliteYear) VALUES (?, ?, ?, ?, ?)';
//     for (var i = 0; i < USER_COUNT; i++) {
//       var name = faker.name.findName();
//       var avatar_url = faker.image.avatar();
//       // var friendCount = Math.floor(Math.random() * 500);
//       var starCount = Math.floor(Math.random() * 100);
//       var eliteYear = seedHelper.getElite();
      
//       db.query(query, [name, avatar_url, friendCount, starCount, eliteYear], function(err, results) {
//         if(err) {
//           throw err;
//         } else {
//           console.log('user seeded.');
//         }
//       });
//     }
//   },

//   seedFriends: function() {
//     let query = 'INSERT INTO friends (friendsCount, userId) VALUES (?, ?)';
//     for (var i = 0; i < USER_COUNT; i++) {
//       var friendsCount = Math.floor(Math.random() * 500);
//       var userId = i;

//       db.query(query, [friendsCount, userId], function(err, results) {
//         if (err) {
//           throw err;
//         } else {
//           console.log('friends seeded.');
//         }
//       });
//     }
//   },

//   seedRestaurants: function() {
//     let query = 'INSERT INTO restaurants (name, ownerId) VALUES (?, ?)';
//     for (var i = 0; i < RESTAURANT_COUNT; i++) {
//       var name = faker.address.streetName();
//       var ownerId = Math.floor(Math.random() * 100 + 1);

//       db.query(query, [name, ownerId], function(err, results) {
//         if(err) {
//           throw err;
//         } else {
//           console.log('location seeded.');
//         }
//       });
//     }
//   },

//   seedVotes: function() {
//     let query = 'INSERT INTO votes (helpful, unhelpful, imageId) VALUES (?, ?, ?)';
//     for (var i = 0; i < RESTAURANT_COUNT; i++) {
//       var upvotes = Math.floor(Math.random() * 5);
//       var downvotes = Math.floor(Math.random() * 3);

//       db.query(query, [upvotes, downvotes, i+1], function(err, results) {
//         if (err) {
//           throw err
//         } else {
//           console.log('votes for image seeded.')
//         }
//       });
//     }
//   },

//   seedImages: function() {
//     let query = 'INSERT INTO images (img_url, title, locationId, ownerId) VALUES (?, ?, ?, ?)';
//     for (var i = 0; i < RESTAURANT_COUNT; i++) {
//       var random = Math.floor(Math.random() * 5); // pick 1 out of 5 folders of images
//       var imgCount = IMG_SAMPLE_COUNT[random];
//       for (var j = 0; j < imgCount; j++) {
//         var img_url = aws_url + random + '/' + j + '.jpg';
//         var title = faker.commerce.productName();
//         var restaurantId = i + 1;
//         var ownerId = Math.floor(Math.random() * 100 + 1);
        
//         db.query(query, [img_url, title, restaurantId, ownerId], function(err, results) {
//           if(err) {
//             throw err;
//           } else {
//             console.log('image seeded.');
//           }
//         });
//       }
//     }
//   }

// }



// seed.seedUsers();
// seed.seedFriends();
// seed.seedLocations();
// seed.seedVotes();
// seed.seedImages();