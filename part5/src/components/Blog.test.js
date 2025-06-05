import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Blog from './Blog';

describe('<Blog />', () => {
	let container;
	let blog;
	let updateBlog;

	beforeEach(() => {
		updateBlog = jest.fn();
		blog = {
			title: 'placeholder blog',
			author: 'test',
			url: 'example.com',
			user: {
				username: 'wakanko',
				name: 'Chencho Perez',
				id: '0001'
			}
		};
		container = render(<Blog blog={blog} user={blog.user} updateBlog={updateBlog}/>).container;
	});

	test('renders blogs title and author, does not show url and likes', () => {

		const blogInfo = container.querySelector('.blog-info');
		const blogDetails = container.querySelector('.blog-details');
		expect(blogInfo).toHaveTextContent(
			`${blog.title} ${blog.author}`
		);
		expect(blogDetails).toHaveStyle('display: none');
	});

	test('url and likes are shown when you press view button', async () => {
		const user = userEvent.setup();
		const button = screen.getByText('view');
		await user.click(button);

		const blogDetails = container.querySelector('.blog-details');
		expect(blogDetails).not.toHaveStyle('display: none');
	});

	test('if like button is clicked twice, the handler gets called twice', async () => {
		const user = userEvent.setup();
		const likeButton = screen.getByText('like');
		await user.click(likeButton);
		await user.click(likeButton);
		expect(updateBlog.mock.calls).toHaveLength(2);
	});
});