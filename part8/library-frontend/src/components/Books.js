import { useState } from 'react';
import { useQuery } from '@apollo/client';
import { ALL_BOOKS } from '../queries';

const Books = (props) => {
  const [genre, setGenre] = useState('');
  const res = useQuery(ALL_BOOKS, {
    variables: { genre }
  });

  if (!props.show) {
    return null;
  }

  if (res.loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h2>books</h2>

      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
          {res.data.allBooks.map((a) => (
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div>
        <button onClick={() => setGenre('')}>all</button>
        <button onClick={() => setGenre('magic')}>magic</button>
        <button onClick={() => setGenre('hacks')}>hacks</button>
      </div>
    </div>
  );
};

export default Books;
