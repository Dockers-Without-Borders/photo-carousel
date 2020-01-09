var model = require('./model.js');

let controller = {

  retrieveImages: function (locationId) {
    return model.sampleQuery(locationId);
  },

  locationQuery: function (locationId) {
    return model.locationQuery(locationId);
  },

  imagesQuery: function (restaurant_id) {
    let imagesQueryPromise = new Promise( (resolve, reject) => {
      model.imagesQuery(restaurant_id)
      .then( results => {
        let imagesData = [];
        results.rows.forEach( result => {
          let image = {
            id: result.id,
            img_url: result.img_url,
            upvotes: result.upvotes,
            downvotes: result.downvotes,
            caption: result.caption,
            created_at: result.created_at,
            restaurant_id: result.restaurant_id,
            owner: {
              id: result.user_id,
              name: result.user_name,
              avatar_url: result.avatar_url,
              friendCount: result.friendcount,
              starCount: result.starcount,
              eliteYear: result.eliteyear
            }
          };
          imagesData.push(image);
        });
        resolve(imagesData);
      });
    });
    return imagesQueryPromise;
  },

};

module.exports = controller;