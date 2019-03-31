const environment = process.env.NODE_ENV || 'development';
const configuration = require('../knexfile')[environment];

module.exports = require('knex')(configuration);

// module.exports = database;

// const knex = require('knex');
// const environment = process.env.NODE_ENV || 'development';
// const config = require('../knexfile')[environment];
// module.exports = require('knex')(config);
