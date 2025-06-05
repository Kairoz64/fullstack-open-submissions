import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import BlogForm from './BlogForm';

describe('<BlogForm />', () => {
	test('form calls handler with the right details', async () => {
		const createBlog = jest.fn();
		const newBlog = {
			title: 'placeholder blog',
			author: 'test',
			url: 'example.com'
		};

		const user = userEvent.setup();

		const { container } = render(<BlogForm createBlog={createBlog} />);

		const inputs = screen.getAllByRole('textbox');
		const createButton = container.querySelector('.submit-button');

		await user.type(inputs[0], newBlog.title);
		await user.type(inputs[1], newBlog.author);
		await user.type(inputs[2], newBlog.url);
		await user.click(createButton);

		expect(createBlog.mock.calls).toHaveLength(1);
		expect(createBlog.mock.calls[0][0].title).toBe('placeholder blog');
		expect(createBlog.mock.calls[0][0].author).toBe('test');
		expect(createBlog.mock.calls[0][0].url).toBe('example.com');
	});
});