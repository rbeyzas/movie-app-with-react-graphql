const express = require('express');
const expressGraphQl = require('express-graphql');

const app = express();

app.use('/graphql', expressGraphQl({}));

app.listen(5000, () => {
  console.log('Server is listening on port 5000...');
});
