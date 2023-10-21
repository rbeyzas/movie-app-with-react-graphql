const graphql = require('graphql');
const _ = require('lodash');

//Mongodb Model
const Movie = require('../models/Movie');
const Director = require('../models/Director');

const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLSchema,
  GraphQLID,
  GraphQLList,
  GraphQLNonNull,
} = graphql;

const MovieType = new GraphQLObjectType({
  name: 'Movie',
  fields: () => ({
    id: { type: GraphQLString },
    title: { type: GraphQLString },
    description: { type: GraphQLString },
    year: { type: GraphQLInt },
    director: {
      type: DirectorType,
      resolve(parent, args) {
        // console.log(parent)
        // dummy data kullanırken:
        //return _.find(directors, { id: parent.id });
        return Director.findById(parent.directorId);
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
        // dummy data kullanırken:
        //return _.filter(movies, { directorId: parent.id });
        // filter metodu kullanmamızın sebebi tek bir data aramıyoruz. find ile 1 data bulunur ve sonrakilere bakılmaz.
        return Movie.find({ directorId: parent.id });
      },
    },
  }),
});

const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    movie: {
      type: MovieType,
      args: { id: { type: GraphQLString } },
      resolve(parent, args) {
        // code to get data from db / other source
        // dummy data kullanırken:
        // return _.find(movies, { id: args.id });
        return Movie.findById(args.id);
      },
    },
    director: {
      type: DirectorType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        // dummy data kullanırken:
        // return _.find(directors, { id: args.id });
        return Director.findById(args.id);
      },
    },
    movies: {
      type: new GraphQLList(MovieType),
      resolve(parent, args) {
        // dummy data kullanırken:
        // return movies;
        return Movie.find({});
        //ne kadar data varsa hepsini dön
      },
    },
    directors: {
      type: new GraphQLList(DirectorType),
      resolve(parent, args) {
        // dummy data kullanırken:
        // return directors;
        return Director.find({});
        //ne kadar data varsa hepsini dön
      },
    },
  },
});

const Mutation = new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    addMovie: {
      type: MovieType,
      args: {
        title: { type: new GraphQLNonNull(GraphQLString) },
        description: { type: GraphQLString },
        year: { type: new GraphQLNonNull(GraphQLInt) },
        directorId: { type: new GraphQLNonNull(GraphQLID) },
      },
      resolve(parent, args) {
        const movie = new Movie({
          title: args.title,
          description: args.description,
          year: args.year,
          directorId: args.directorId,
        });
        return movie.save();
      },
    },
    addDirector: {
      type: DirectorType,
      args: {
        name: { type: new GraphQLNonNull(GraphQLString) },
        birth: { type: GraphQLInt },
      },
      resolve(parent, args) {
        const director = new Director({
          name: args.name,
          birth: args.birth,
        });
        return director.save();
      },
    },
  },
});
// fields içerisine kullanacağımız mutationları yazdık.
// args içerisine kaydetmek istediklerimizi yazacağız.
module.exports = new GraphQLSchema({
  query: RootQuery,
  mutation: Mutation,
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

// CRUD işlemleri için mutation kullanılır.
// GraphQLNonNull: girilmesi zorunlu olan alanları belitrledik.
