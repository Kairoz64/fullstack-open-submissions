import { useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Routes, Route } from 'react-router-dom';
import { setLoggedUser } from './reducers/loggedUserReducer';
import Blogs from './components/Blogs';
import BlogForm from './components/BlogForm';
import BlogView from './components/BlogView';
import Login from './components/Login';
import Toggleable from './components/Toggleable';
import NavBar from './components/NavBar';
import Notification from './components/Notification';
import Users from './components/Users';
import UserView from './components/UserView';
import blogService from './services/blogs';

const App = () => {
  const user = useSelector((state) => state.loggedUser);
  const dispatch = useDispatch();

  const blogFormRef = useRef();

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedUser');

    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      dispatch(setLoggedUser(user));
      blogService.setToken(user.token);
    }
  }, []);

  const toggle = () => {
    blogFormRef.current.toggleVisibility();
  };

  return (
    <div>
      <NavBar />
      <h2>blogs</h2>
      <Notification />
      {!user && <Login />}
      {user && (
        <>
          <Routes>
            <Route path="/blogs/:id" element={<BlogView />} />
            <Route path="/users/:id" element={<UserView />} />
            <Route path="/users" element={<Users />} />
            <Route
              path="/"
              element={
                <>
                  <Toggleable buttonLabel="new blog" ref={blogFormRef}>
                    <BlogForm toggle={toggle} />
                  </Toggleable>
                  <Blogs />
                </>
              }
            />
          </Routes>
        </>
      )}
    </div>
  );
};

export default App;
