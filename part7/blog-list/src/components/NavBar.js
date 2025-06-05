import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import blogService from '../services/blogs';
import { setNotification } from '../reducers/notificationReducer';
import { unsetLoggedUser } from '../reducers/loggedUserReducer';
import styled from 'styled-components';

const NavBarContainer = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: baseline;
  border: solid #000 1px;
  padding: 20px 10px;
  background: #3759bd;
  color: #fff;
`;

const NavEl = styled.div`
  padding-right: 12px;
  color: #fff;
  & a {
    text-decoration: none;
  }
`;

const LogoutButton = styled.button`
  background: #ffbf34;
  padding: 5px 10px;
  border:  solid #ffd885 2px;
  border-radius: 8px;
  color: #000;
`;

const NavBarLink = styled.div`
  color: #ffdf34;
  font-weight: 900;
`;

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
    <NavBarContainer>
      <NavEl>
        <Link className="nav-el" to="/">
          <NavBarLink>
            blogs
          </NavBarLink>
        </Link>
      </NavEl>
      <NavEl>
        <Link className="nav-el" to="/users">
          <NavBarLink>
            users
          </NavBarLink>
        </Link>
      </NavEl>
      {user && (
        <>
          <NavEl>{user.username} logged in</NavEl>
          <NavEl>
            <LogoutButton onClick={handleLogout}>
              logout
            </LogoutButton>
          </NavEl>
        </>
      )}
    </NavBarContainer>
  );
};

export default NavBar;
