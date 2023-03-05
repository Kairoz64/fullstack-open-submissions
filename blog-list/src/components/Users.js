import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { initializeUsers } from '../reducers/userReducer';

const Users = () => {
  const users = useSelector((state) => {
    return [...state.users].sort((a, b) => a.name.localeCompare(b.name));
  });

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(initializeUsers());
  }, []);

  return (
    <div>
      <h2>Users</h2>
      <table>
        <tbody>
          <tr>
            <th>&nbsp;</th>
            <th>blogs created</th>
          </tr>
          {users.map(u => {
            return (
              <tr key={u.id}>
                <td>{u.name}</td>
                <td>{u.blogs.length}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default Users;