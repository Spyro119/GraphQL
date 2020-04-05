const { db, con } = require('../Database')
const graphql = require('graphql');
const makeExecutableSchema = require('graphql-tools').makeExecutableSchema;
const resolver = require('../resolvers').resolver;
const {
  GraphQLDate,
  GraphQLTime,
  GraphQLDateTime
} = require('graphql-iso-date');

const { 
  GraphQLObjectType,
  GraphQLString, 
  GraphQLSchema, 
  GraphQLID,
  GraphQLList,
  GraphQLInt 
} = graphql;


// const adress = [];
// con.query("SELECT * FROM adresses", (err, res) => {
//     for (result of res) adress.push(JSON.parse(JSON.stringify(result)));
// })