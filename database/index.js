var { Pool } = require('pg');

let pool = new Pool({
  host: 'localhost',
  user: 'alextian',
  database: 'photocarousel',
});

module.exports = {
  pool: pool
}

 // host: '18.144.8.170',