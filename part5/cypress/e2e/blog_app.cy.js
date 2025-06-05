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
				cy.createBlog({ title:'blog4', author: 'fastcat', url: 'example.com' });
				cy.visit('');
			});

			it('user can like a blog', function() {
				cy.contains('blog1')
					.contains('view').click();
				cy.contains('like').click();
				cy.get('.number-likes').contains('1');
			});

			it('user can delete their own blogs', function() {
				cy.contains('blog1')
					.contains('view').click();
				cy.contains('remove').click();
				cy.contains('Blog removed successfully');
			});

			it('user can not see remove button in other blogs', function() {
				cy.contains('blog3')
					.contains('view').click();
				cy.should('not.contain', 'remove');
			});

			describe('blogs have likes', function() {
				beforeEach(function() {
					cy.contains('blog1')
						.contains('view').click();
					cy.wait(150);

					for (let i = 0; i<1; i++) {
						cy.contains('blog1')
							.parent()
							.contains('like')
							.click({ force: true });
						cy.wait(150);
					}

					cy.contains('blog2')
						.contains('view').click();
					cy.wait(150);

					for (let i = 0; i<3; i++) {
						cy.contains('blog2')
							.parent()
							.contains('like')
							.click({ force: true });
						cy.wait(150);
					}

					cy.contains('blog3')
						.contains('view').click();
					cy.wait(150);

					cy.contains('blog4')
						.contains('view').click();
					cy.wait(150);

					for (let i = 0; i<2; i++) {
						cy.contains('blog4')
							.parent()
							.contains('like')
							.click({ force: true });
						cy.wait(150);
					}
				});

				it('blogs are ordered by number of likes', function() {
					cy.get('.blog-container').eq(0).should('contain', 'blog2');
					cy.get('.blog-container').eq(1).should('contain', 'blog4');
					cy.get('.blog-container').eq(2).should('contain', 'blog1');
					cy.get('.blog-container').eq(3).should('contain', 'blog3');
				});
			});
		});
	});
});