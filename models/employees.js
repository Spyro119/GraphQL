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

// const employeesType = new GraphQLObjectType({
//     name:'employee',
//     fields: () =>({
//         id: { type: GraphQLID },
//         firstname: { type: GraphQLString },
//         lastname: { type: GraphQLString }
//     }) 
// });


const employee = [];
con.query("SELECT * FROM employees", (err, res) => {
    for (result of res) employee.push(JSON.parse(JSON.stringify(result)));
})
