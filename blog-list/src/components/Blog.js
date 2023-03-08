import { Link } from 'react-router-dom';
import './Blog.css';

const Blog = ({ blog }) => {
  return (
    <div className="blog-container">
      <Link className="blog-info" to={`/blogs/${blog.id}`}>
        {blog.title} {blog.author}
      </Link>
    </div>
  );
};

export default Blog;
