import './App.css';
import BookList from './components/BookList';
import AddBook from './components/AddBook';
import Navbar from './components/Navbar';
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';
import { ModalProvider } from './context/ModalContext';
import { SearchProvider } from './context/SearchContext';
import AddAuthor from './components/AddAuthor';


// Apollo client setup
const client = new ApolloClient({
  uri: 'http://localhost:4000/graphql',
  cache: new InMemoryCache(),
});

function App() {

  return (
    <ApolloProvider client={client}>
      <ModalProvider>
        <div id="main-div">
          <SearchProvider>
            <Navbar/>
            <BookList/>
          </SearchProvider>
          <AddBook/>
          <AddAuthor/>
        </div>
      </ModalProvider>
    </ApolloProvider>
  )
}

export default App
