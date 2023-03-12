import { Link } from 'react-router-dom';
import styled from 'styled-components';
import './Blog.css';

const BlogContainer = styled.div`
  border: solid #000 1px;
  border-radius: 5px;
  padding: 20px 10px;
  background: #9a7fde;
  color: #fff;
  margin: 10px 5px;
  color: #ffdf34;
  font-weight: 900;
  text-decoration: none;
`;

const Blog = ({ blog }) => {
  return (
    <Link className="blog-info" to={`/blogs/${blog.id}`}>
      <BlogContainer>
        {blog.title} {blog.author}
      </BlogContainer>
    </Link>
  );
};

export default Blog;
