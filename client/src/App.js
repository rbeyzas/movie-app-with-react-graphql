import './App.css';
import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client';
import MovieList from './components/MovieList';
import NewMovieForm from './components/NewMovieForm';

const client = new ApolloClient({
  uri: 'http://localhost:5000/graphql',
  cache: new InMemoryCache(),
});

// Supported in React 18+
// const root = ReactDOM.createRoot(document.getElementById('root'));

const App = () => {
  return (
    <ApolloProvider client={client}>
      <div className="App">
        <MovieList />
        <NewMovieForm />
      </div>
    </ApolloProvider>
  );
};

export default App;
