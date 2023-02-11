import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render, screen } from '@testing-library/react';
import Blog from './Blog';

test('renders blogs title and author, does not show url and likes', () => {
	const user = {
		username: 'wakanko',
		name: 'Chencho Perez',
		id: '0001'
	};

	const blog = {
		title: 'placeholder blog',
		author: 'test',
		url: 'example.com',
		user
	};

	const { container } = render(<Blog blog={blog} user={user} />);
	const blogInfo = container.querySelector('.blog-info');
	const blogDetails = container.querySelector('.blog-details');
	expect(blogInfo).toHaveTextContent(
		`${blog.title} ${blog.author}`
	);
	expect(blogDetails).toHaveStyle('display: none');
});