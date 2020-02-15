require('dotenv').config();
const fs = require('fs');
const path = require('path');

// Packages
const jwt = require('jsonwebtoken');

// Apollo imports
const { ApolloServer, AuthenticationError } = require('apollo-server');

// GraphQL imports
const typeDefs = fs.readFileSync(path.join(__dirname, 'graphql', 'typeDefs.gql'), 'utf-8');
const resolvers = require('./graphql/resolvers/index');

// MongoDB imports
const mongoose = require('mongoose');

// Get current user on every request
const getUser = async token => {
	if (token) {
		try {
			return await jwt.verify(token, process.env.SECRET);
		} catch (err) {
			throw new AuthenticationError('Your session has ended. Please sign in again.');
		}
	}
};

const server = new ApolloServer({
	typeDefs,
	resolvers,
	context: async ({ req }) => {
		const token = req.headers.authorization || '';
		const currentUser = await getUser(token);
		return {
			currentUser
		};
	}
});

mongoose
	.connect(process.env.DB_URL, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
		useCreateIndex: true,
		useFindAndModify: false
	})
	.then(() => {
		console.log('DB connected');
		return server.listen({ port: process.env.PORT || 4000 });
	})
	.then(({ url }) => {
		console.log('Server listening on ' + url);
	})
	.catch(err => console.log(err));
