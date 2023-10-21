const express = require('express');
const { graphqlHTTP } = require('express-graphql');
const cors = require('cors');
const schema = require('./schema/schema');

const app = express();
app.use(cors());
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
