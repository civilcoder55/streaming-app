//required packages
const { Client } = require('@elastic/elasticsearch')
const config = require("../../config");

//init elasticsearch connection
const client = new Client({ node: config.elasticsearch.node });


module.exports = client

