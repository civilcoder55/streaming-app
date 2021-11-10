//required packages
const { Client } = require('@elastic/elasticsearch')


//init elasticsearch connection
const client = new Client({ node: 'http://localhost:9200' });


module.exports = client