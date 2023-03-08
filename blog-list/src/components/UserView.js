import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { initializeUsers } from '../reducers/userReducer';

const UserView = () => {
  const id = useParams().id;
  const user = useSelector(state => state.users.find(u => u.id === id));

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(initializeUsers());
  }, []);

  if (!user) {
    return null;
  } else {
    return (
      <div>
        <h2>{user.name}</h2>
        <h3>added blogs</h3>
        <ul>
          {user.blogs.map(b => <li key={b.id}>{b.title}</li>)}
        </ul>
      </div>
    );
  }
};

export default UserView;