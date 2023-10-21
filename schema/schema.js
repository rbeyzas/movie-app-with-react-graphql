const graphql = require('graphql');
const _ = require('lodash');

const { GraphQLObjectType, GraphQLString, GraphQLInt, GraphQLSchema, GraphQLID, GraphQLList } =
  graphql;

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
    directorId: '1',
  },
  {
    id: '2',
    title: 'Scarface',
    description:
      'In Miami in 1980, a determined Cuban immigrant takes over a drug cartel and succumbs to greed.',
    year: 1980,
    directorId: '3',
  },
  {
    id: '3',
    title: 'Pulp Fiction',
    description:
      "The lives of two mob hitmen, a boxer, a gangster's wife, and a pair of diner bandits intertwine in four tales of violence and redemption.",
    year: 1994,
    directorId: '2',
  },
  {
    id: '4',
    title: 'Apocalypse Now',
    description:
      'During the Vietnam War, Captain Willard is sent on a dangerous mission into Cambodia to assassinate a renegade Colonel who has set himself up as a god among a local tribe.',
    year: 1979,
    directorId: '1',
  },
  {
    id: '5',
    title: 'Reservoir Dogs',
    description:
      'After a simple jewelry heist goes terribly wrong, the surviving criminals begin to suspect that one of them is a police informant.',
    year: 1979,
    directorId: '3',
  },
];

const MovieType = new GraphQLObjectType({
  name: 'Movie',
  fields: () => ({
    id: { type: GraphQLID },
    title: { type: GraphQLString },
    description: { type: GraphQLString },
    year: { type: GraphQLInt },
    director: {
      type: DirectorType,
      resolve(parent, args) {
        // console.log(parent)
        return _.find(directors, { id: parent.id });
      },
    },
  }),
});

const DirectorType = new GraphQLObjectType({
  name: 'Director',
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    birth: { type: GraphQLInt },
    movies: {
      type: new GraphQLList(MovieType),
      resolve(parent, args) {
        return _.filter(movies, { directorId: parent.id });
        // filter metodu kullanmamızın sebebi tek bir data aramıyoruz. find ile 1 data bulunur ve sonrakilere bakılmaz.
      },
    },
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
    movies: {
      type: new GraphQLList(MovieType),
      resolve(parent, args) {
        return movies;
      },
    },
    directors: {
      type: new GraphQLList(DirectorType),
      resolve(parent, args) {
        return directors;
      },
    },
  },
});

module.exports = new GraphQLSchema({
  query: RootQuery,
});

// lodash: array ve objelerde her türlü işlem yapılabiliyor. arama değiştirme gibi işlemler hızlı bir şekilde yapılıyor
// lodash ile ilgili daha fazla bilgi için: https://lodash.com/docs/4.17.15
// sorgu atarken movie(id:"1") olan dataya erişmek istediğimizde eğer id: { type: GraphQLID }, demezsek hata alırız.
// MovieType içerisinde parent'ı konsolladığım zaman almka istediğim verinin tamamını gösterir. yani gelen veri parent içerisine yazılır.
// mesela movie id'si 1 olan datayı almak istediğimde o movieyi  bana getirir. movie üzerinde direktör de tnaımlı olduğu için direktöre de ulaşabiliriz.
// parent içerisinde bize ne resolve oluyorsa o gelir.
// mesela movie içerisinde yapmışsak movie'nin root query'sinde resolve içerisinde yazan fonksiyon neyse parent odur.

// bir filmin 1 yönetmeni var. bu sebepten MovieType'ta direktör için dönen data 1 tane olacak. ama bir yönetmenin birden fazla filmi olabilir.
// bu yüzden burda dönecek olan data array oalcak yani bir liste olacak. bu sebepten GraphQLList tipini kullandık.

// RootQuery'de aşağıdakini yazarsak tüm film datası döndürülür:
// movies: {
//   type: new GraphQLList(MovieType),
//   resolve(parent, args) {
//     return movies; // Tüm filmleri döndür
//   },
// },
