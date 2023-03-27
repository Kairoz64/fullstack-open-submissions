import { useState, useEffect } from 'react';
import { useApolloClient, useSubscription } from '@apollo/client';
import { BOOK_ADDED } from './queries';
import Authors from './components/Authors';
import Books from './components/Books';
import NewBook from './components/NewBook';
import LoginForm from './components/LoginForm';
import Recommend from './components/Recommend';

const App = () => {
  const client = useApolloClient();
  const [token, setToken] = useState(null);
  const [page, setPage] = useState('authors');
  useSubscription(BOOK_ADDED, {
    onData: ({ data }) => {
      const book = data.data.bookAdded;
      window.alert(`Added ${book.title} by ${book.author.name}`);
      client.refetchQueries({
        include: ['AllBooks']
      });
    }
  });

  useEffect(() => {
    const userToken = localStorage.getItem('user-token');
    setToken(userToken);
  }, []);

  const logout = () => {
    setToken(null);
    localStorage.removeItem('user-token');
    client.resetStore();
  };

  return (
    <div>
      <div>
        <button onClick={() => setPage('authors')}>authors</button>
        <button onClick={() => setPage('books')}>books</button>
        {token && <button onClick={() => setPage('add')}>add book</button>}
        {token && (
          <button onClick={() => setPage('recommend')}>recommend</button>
        )}
        {!token ? (
          <button onClick={() => setPage('login')}>login</button>
        ) : (
          <button onClick={logout}>logout</button>
        )}
      </div>

      <Authors show={page === 'authors'} token={token} />

      <Books show={page === 'books'} />

      <NewBook show={page === 'add'} token={token} />

      <Recommend show={page === 'recommend'} />

      <LoginForm
        show={page === 'login'}
        setToken={setToken}
        setPage={setPage}
      />
    </div>
  );
};

export default App;
