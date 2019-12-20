const express = require('express');
const path = require('path');
const cors = require('cors');
var controller = require('./controller.js');

const app = express();

app.set('port', 3001);
app.use(cors());
app.use('/', express.static(path.join(__dirname, '../client/dist')));

app.get('/photo-carousel/:locationId', (req, res) => {
  let locationId = req.params.locationId;
  controller.sampleQuery(locationId)
  .catch( err => {
    res.status(404).send(err);
  })
  .then( result => {
    res.status(200).send(result);
  });
});

app.get('/photo-carousel/:locationId', (req, res) => {
  let locationId = req.params.locationId;
  let data = {};

  controller.locationQuery(locationId)
  .catch( err => {
    res.status(400).send(err);
  })
  .then( result => {
    data['locationData'] = result;
    return controller.imagesQuery(locationId);
  })
  .catch( err => {
    res.status(404).send(err);
  })
  .then( result => {
    data['images'] = result;
    res.status(200).send(data);
  });
});

app.post('/photo-carousel/:locationId', (req, res) => {
  let locationId = req.params.locationId;
  
  controller.postPhoto(locationId)
  .then(() => {
    res.sendStatus(200)
  })
  .catch(err => {
    res.status(400).send(err)
  })
})

app.put('/photo-carousel/:locationId/:photoId', (req, res) => {
  let locationId = req.params.locationId;
  let photoId = req.params.photoId;

  controller.editInfo(locationId, photoId)
  .then(() => {
    res.sendStatus(200)
  })
  .catch(err => {
    res.status(400).send(err)
  })
})

app.delete('/photo-carousel/:locationId/:photoId', (req, res) => {
  let locationId = req.params.locationId;
  let photoId = req.params.photoId;

  controller.deletePhoto(locationId, photoId)
  .then(() => {
    res.sendStatus(200)
  })
  .catch(err => {
    res.status(400).send(err)
  })
})

if (!module.parent) {
  app.listen(app.get('port'));
  console.log('Listening on:', app.get('port'));
}