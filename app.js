const express = require('express');
const { graphqlHTTP } = require('express-graphql');

const schema = require('./schema/schema');

const app = express();
require('dotenv').config();
const db = require('./helpers/db.js')();
app.use(
  '/graphql',
  graphqlHTTP({
    schema,
    graphiql: true,
  }),
);
//http://localhost:5000/graphql

app.listen(5000, () => {
  console.log('Server is listening on port 5000...');
});
