import { useQuery } from '@apollo/client';
import { ALL_BOOKS, USER } from '../queries';

const Recommend = (props) => {
  const userRes = useQuery(USER);
  const res = useQuery(ALL_BOOKS, {
    variables: { genre: userRes.loading ? null : userRes.data.me.favoriteGenre }
  });

  if (!props.show) {
    return null;
  }

  if (res.loading || userRes.loading) {
    return <div>Loading...</div>;
  }

  const favoriteGenre = userRes.data.me.favoriteGenre;

  return (
    <div>
      <h2>recommendations</h2>
      <div>
        books in your favorite genre <b>{favoriteGenre}</b>
      </div>
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
    </div>
  );
};

export default Recommend;
