describe('Blog app', function() {
	beforeEach(function() {
		cy.request('POST', `${Cypress.env('BACKEND')}/testing/reset`);
		const user1 = {
			username: 'cat0',
			name: 'Chencho Perez',
			password: 'meow'
		};

		const user2 = {
			username: 'hackerman',
			name: 'Anon',
			password: '123'
		};

		cy.createUser(user1);
		cy.createUser(user2);
		cy.visit('');
	});

	it('Login form is shown', function() {
		cy.contains('Login');
	});

	describe('Login',function() {
		it('succeeds with correct credentials', function() {
			cy.get('#username-login')
				.type('cat0');
			cy.get('#password-login')
				.type('meow');
			cy.get('#submit-login')
				.click();
			cy.contains('cat0 logged in');
		});

		it('fails with wrong credentials', function() {
			cy.get('#username-login')
				.type('cat0');
			cy.get('#password-login')
				.type('kek');
			cy.get('#submit-login')
				.click();
			cy.contains('Wrong credentials');
			cy.get('.error').should('have.css', 'color', 'rgb(255, 0, 0)');
			cy.get('.error').should('have.css', 'border-style', 'solid');
		});
	});

	describe('when logged in', function() {
		beforeEach(function() {
			cy.login({ username:'cat0', password:'meow' });
		});

		it('A blog can be created', function() {
			cy.contains('new blog').click();
			cy.get('#title-newBlog')
				.type('Wakanko');
			cy.get('#author-newBlog')
				.type('Fast Cat');
			cy.get('#url-newBlog')
				.type('example.com');
			cy.get('#submit-newBlog').click();
			cy.contains('Wakanko');
		});

		describe('and some blogs exist', function() {
			beforeEach(function() {
				cy.createBlog({ title:'blog1', author: 'fastcat', url: 'example.com' });
				cy.createBlog({ title:'blog2', author: 'fastcat', url: 'example.com' });
				cy.logout();
				cy.login({ username: 'hackerman', password: '123' });
				cy.createBlog({ title:'blog3', author: 'haxx0r', url: 'example.com' });
				cy.logout();
				cy.login({ username:'cat0', password:'meow' });
				cy.visit('');
			});
		});
	});
});