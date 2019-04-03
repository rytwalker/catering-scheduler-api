const express = require('express');
const graphqlHttp = require('express-graphql');
const graphqlSchema = require('./graphql/schema/index');
const resolvers = require('./graphql/resolvers/index');
const isAuth = require('./middleware/is-auth');

const app = express();

app.use(express.json());
app.use(isAuth);

app.use(
  '/graphql',
  graphqlHttp({
    schema: graphqlSchema,
    rootValue: resolvers,
    graphiql: true
  })
);

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`App running on port ${port}`));
