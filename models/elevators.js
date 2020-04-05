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

const elevators = [];
con.query("SELECT * FROM elevators", (err, res) => {
    for (result of res) elevators.push(JSON.parse(JSON.stringify(result)));
})