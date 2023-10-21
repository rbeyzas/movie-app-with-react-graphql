const graphql = require('graphql');
const _ = require('lodash');
// lodash: array ve objelerde her türlü işlem yapılabiliyor. arama değiştirme gibi işlemler hızlı bir şekilde yapılıyor
// lodash ile ilgili daha fazla bilgi için: https://lodash.com/docs/4.17.15

const { GraphQLObjectType, GraphQLString, GraphQLInt, GraphQLSchema, GraphQLID } = graphql;
// sorgu atarken movie(id:"1") olan dataya erişmek istediğimizde eğer
// id: { type: GraphQLID }, demezsek hata alırız.

//dummy data
const directors = [
  {
    id: '1',
    name: 'Francis Ford Coppola',
    birth: 1939,
  },
  {
    id: '2',
    name: 'Quentin Tarantino',
    birth: 1963,
  },
  {
    id: '3',
    name: 'Brian De Palma',
    birth: 1940,
  },
];

const movies = [
  {
    id: '1',
    title: 'The Godfather',
    description:
      'The aging patriarch of an organized crime dynasty transfers control of his clandestine empire to his reluctant son.',
    year: 1972,
  },
  {
    id: '2',
    title: 'Scarface',
    description:
      'In Miami in 1980, a determined Cuban immigrant takes over a drug cartel and succumbs to greed.',
    year: 1980,
  },
  {
    id: '3',
    title: 'Pulp Fiction',
    description:
      "The lives of two mob hitmen, a boxer, a gangster's wife, and a pair of diner bandits intertwine in four tales of violence and redemption.",
    year: 1994,
  },
];

const MovieType = new GraphQLObjectType({
  name: 'Movie',
  fields: () => ({
    id: { type: GraphQLID },
    title: { type: GraphQLString },
    description: { type: GraphQLString },
    year: { type: GraphQLInt },
  }),
});

const DirectorType = new GraphQLObjectType({
  name: 'Director',
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    birth: { type: GraphQLInt },
  }),
});

const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    movie: {
      type: MovieType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        // code to get data from db / other source
        return _.find(movies, { id: args.id });
      },
    },
    director: {
      type: DirectorType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        return _.find(directors, { id: args.id });
      },
    },
  },
});

module.exports = new GraphQLSchema({
  query: RootQuery,
});
