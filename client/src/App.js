import './App.css';
import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client';
import MovieList from './components/MovieList';

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
      </div>
    </ApolloProvider>
  );
};

export default App;
