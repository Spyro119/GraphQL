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

const column = [];
con.query("SELECT * FROM columns", (err, res) => {
    for (result of res) column.push(JSON.parse(JSON.stringify(result)));
    // console.log(column)   
})
