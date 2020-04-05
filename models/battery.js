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

const batteries = [];
con.query("SELECT * FROM batteries", (err, res) => {
    for (result of res) batteries.push(JSON.parse(JSON.stringify(result)));
})