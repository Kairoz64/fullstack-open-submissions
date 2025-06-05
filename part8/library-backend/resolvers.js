const { PubSub } = require('graphql-subscriptions');
const pubsub = new PubSub();
const { GraphQLError } = require('graphql');
const jwt = require('jsonwebtoken');
const Book = require('./models/book');
const Author = require('./models/author');
const User = require('./models/user');

const resolvers = {
  Author: {
    bookCount: async (root) => {
      return root.bookCount;
    }
  },
  Mutation: {
    addBook: async (root, args, context) => {
      const currentUser = context.currentUser;

      if (!currentUser) {
        throw new GraphQLError('not authenticated', {
          extensions: {
            code: 'BAD_USER_INPUT'
          }
        });
      }

      let author = await Author.findOne({ name: args.author });
      if (!author) {
        const newAuthor = new Author({ name: args.author });

        try {
          author = await newAuthor.save();
        } catch (e) {
          throw new GraphQLError('author name must be min length 4', {
            extensions: {
              code: 'BAD_USER_INPUT',
              invalidArgs: args.author,
              error: e
            }
          });
        }
      }
      const book = new Book({ ...args, author: author._id });
      try {
        await book.save();
        author.bookCount = author.bookCount + 1;
        await author.save();
      } catch (e) {
        throw new GraphQLError('book title must be min length 5 and unique', {
          extensions: {
            code: 'BAD_USER_INPUT',
            invalidArgs: args.title,
            error: e
          }
        });
      }
      await book.populate('author');
      pubsub.publish('BOOK_ADDED', { bookAdded: book });

      return book;
    },
    editAuthor: async (root, args, context) => {
      const currentUser = context.currentUser;

      if (!currentUser) {
        throw new GraphQLError('not authenticated', {
          extensions: {
            code: 'BAD_USER_INPUT'
          }
        });
      }

      const author = await Author.findOne({ name: args.name });
      if (!author) {
        return null;
      }

      author.born = args.setBornTo;
      return author.save();
    },
    createUser: async (root, args) => {
      const user = new User({ ...args });

      try {
        await user.save();
      } catch (e) {
        throw new GraphQLError('username must be min length 3 and unique', {
          extensions: {
            code: 'BAD_USER_INPUT',
            invalidArgs: args.username,
            error: e
          }
        });
      }
      return user;
    },
    login: async (root, args) => {
      const user = await User.findOne({ username: args.username });
      if (!user || args.password !== 'secret') {
        throw new GraphQLError('wrong credentials', {
          extensions: {
            code: 'BAD_USER_INPUT'
          }
        });
      }

      const userForToken = {
        username: user.username,
        id: user._id
      };

      return { value: jwt.sign(userForToken, process.env.SECRET) };
    }
  },
  Query: {
    bookCount: async () => Book.countDocuments({}),
    authorCount: async () => Author.countDocuments({}),
    allBooks: async (root, args) => {
      let filteredBooks = await Book.find({}).populate('author');
      if (args.author) {
        filteredBooks = filteredBooks.filter(
          (b) => b.author.name === args.author
        );
      }

      if (args.genre) {
        filteredBooks = filteredBooks.filter((b) =>
          b.genres.includes(args.genre)
        );
      }

      return filteredBooks;
    },
    allAuthors: async () => Author.find({}),
    me: (root, args, context) => {
      return context.currentUser;
    }
  },
  Subscription: {
    bookAdded: {
      subscribe: () => pubsub.asyncIterator('BOOK_ADDED')
    }
  }
};

module.exports = resolvers;
