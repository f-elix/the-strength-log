require('dotenv').config();
const fs = require('fs');
const path = require('path');

// Packages
const jwt = require('jsonwebtoken');

// Fastify imports
const fastify = require('fastify')({});
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

fastify.register(require('fastify-cors'), {
	origin: '*',
	credentials: true
});

fastify.register(gql, {
	graphiql: 'playground',
	schema: typeDefs,
	resolvers,
	context: async (request, reply) => {
		const token = request.headers.authorization || '';
		const currentUser = await getUser(token);
		return {
			currentUser
		};
	}
});

const localPort = 4000;

mongoose
	.connect(process.env.DB_URL, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
		useCreateIndex: true,
		useFindAndModify: false
	})
	.then(() => {
		console.log('DB connected');
		return fastify.listen(process.env.PORT || localPort, '::');
	})
	.then(url => {
		console.log(`Server listening on http://localhost:${localPort}/graphql`);
		console.log(`Playground on http://localhost:${localPort}/playground`);
	})
	.catch(err => console.log(err));
