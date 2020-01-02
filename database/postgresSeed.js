const { Pool } = require('pg');
const faker = require('faker');
const createCSVwriter = require('csv-writer').createObjectCsvWriter;
const path = require('path');

const pool = new Pool({
  user: 'postgres',
  database: 'photocarousel',
  port: 3001
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

const USER_COUNT = 10000;
const RESTAURANT_COUNT = 10000;
const IMG_SAMPLE_COUNT = 10000;

const userWriter = (data) => {
  let writer = createCSVwriter({
    path: `${path.resolve(__dirname, 'csv/userData.csv')}`,
    header: [
      {id: 'name', title: 'name'},
      {id: 'avatar_url', title: 'avatar_url'},
      {id: 'friendCount', title: 'friendCount'},
      {id: 'starCount', title: 'starCount'},
      {id: 'eliteYear', title: 'eliteYear'}
    ]
  });
  return writer.writeRecords(data);
}

const restaurantWriter = (data) => {
  let writer = createCSVwriter({
    path: `${path.resolve(__dirname, 'csv/restaurantData.csv')}`,
    header: [
      {id: 'name', title: 'name'},
      {id: 'owner', title: 'owner'}
    ]
  });
  return writer.writeRecords(data);
}
  
const imageWriter = (data) => {
  let writer = createCSVwriter({
    path: `${path.resolve(__dirname, 'csv/imageData.csv')}`,
    header: [
      {id: 'image_url', title: 'image_url'},
      {id: 'title', title: 'title'},
      {id: 'restaurant', title: 'restaurant'},
      {id: 'createdAt', title: 'createdAt'},
      {id: 'user', title: 'user'},
      {id: 'caption', title: 'caption'},
      {id: 'upvotes', title: 'upvotes'},
      {id: 'downvotes', title: 'downvotes'}
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
        name: faker.name.firstName() + ' ' + faker.name.lastName(),
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
    for (var i = 0; i < RESTAURANT_COUNT; i++) {
      let restaurant = {
        name : faker.address.streetName(),
        owner : Math.floor(Math.random() * 100 + 1)
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
        title: faker.commerce.productName(),
        createdAt: faker.date.recent(),
        
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