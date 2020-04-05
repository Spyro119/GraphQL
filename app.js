const express = require('express');
const graphqlHTTP = require('express-graphql');
const schema = require('./Schema/Schema.js')
const { db } = require('./Database')
// const { db } = require("./pgAdaptor");

const app = express();

app.use('/graphql', graphqlHTTP({
    schema,
    graphiql: true
}));
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
console.log(`Our app is running on port ${ PORT }`);
});