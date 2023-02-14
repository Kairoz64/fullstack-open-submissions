describe('Blog app', function() {
	beforeEach(function() {
		cy.request('POST', 'http://localhost:3003/api/testing/reset');
		const user = {
			username: 'cat0',
			name: 'Chencho Perez',
			password: 'meow'
		};

		cy.request('POST', 'http://localhost:3003/api/users/', user);
		cy.visit('http://localhost:3000');
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

	describe('When logged in', function() {
		beforeEach(function() {
			cy.request('POST', 'http://localhost:3003/api/login/',
				{ username:'cat0', password:'meow' }
			).then(res => {
				localStorage.setItem('loggedUser', JSON.stringify(res.body));
				cy.visit('http://localhost:3000');
			});
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
	});
});