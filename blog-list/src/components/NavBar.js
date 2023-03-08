import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import blogService from '../services/blogs';
import { setNotification } from '../reducers/notificationReducer';
import { unsetLoggedUser } from '../reducers/loggedUserReducer';
import './NavBar.css';

const NavBar = () => {
  const user = useSelector((state) => state.loggedUser);
  const dispatch = useDispatch();

  const handleLogout = () => {
    window.localStorage.removeItem('loggedUser');
    dispatch(unsetLoggedUser());
    blogService.setToken(null);
    dispatch(setNotification('Log out successfully!', 5));
  };

  return (
    <div className="nav-bar">
      <Link className="nav-el" to="/">
        blogs
      </Link>
      <Link className="nav-el" to="/users">
        users
      </Link>
      {user && (
        <>
          <span className="nav-el">{user.username} logged in</span>
          <button className="nav-el" onClick={handleLogout}>
            logout
          </button>
        </>
      )}
    </div>
  );
};

export default NavBar;
