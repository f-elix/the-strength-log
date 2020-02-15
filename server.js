require('dotenv').config();
const fs = require('fs');
const path = require('path');

// Packages
const jwt = require('jsonwebtoken');

// Apollo imports
// const { ApolloServer, AuthenticationError } = require("apollo-server");

// Fastify imports
const fastify = require('fastify')();
const gql = require('fastify-gql');

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
			throw new Error('Your session has ended. Please sign in again.');
		}
	}
};

// const server = new ApolloServer({
// 	typeDefs,
// 	resolvers,
// 	context: async ({ req }) => {
// 		const token = req.headers.authorization || "";
// 		const currentUser = await getUser(token);
// 		return {
// 			currentUser
// 		};
// 	}
// });

fastify.register(require('fastify-cors'), {
	origin: '*',
	credentials: true
});

fastify.register(gql, {
	// jit: 1,
	graphiql: 'playground',
	schema: typeDefs,
	resolvers,
	context: async (req, reply) => {
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
		console.log('\x1b[94m%s', 'MongoDB connected');
		return fastify.listen(process.env.PORT || 4000);
	})
	.then(url => {
		console.log('\x1b[96m%s \x1b[93m%s', `Server listening at`, `${url}/graphql`, '\x1b[0m');
		console.log('\x1b[96m%s \x1b[95m%s', `Playground at`, `${url}/playground`, '\x1b[0m');
	})
	.catch(err => console.log(err));
