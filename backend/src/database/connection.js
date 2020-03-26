const knex = require('knex');
const configuration = require('../../knexfile');

//creates a connection in development mode
const connection = knex(configuration.development);

module.exports = connection;