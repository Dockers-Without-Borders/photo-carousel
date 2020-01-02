var { Pool } = require('pg');

const options = {
  user: 'user',
  password: 'user',
  database: 'yelpoverviewgallery'
};

const db = mysql.createConnection(options);
db.connect();

module.exports = db;