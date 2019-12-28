// Packages
const jwt = require("jsonwebtoken");

// Models
const User = require("../../models/User");
const Session = require("../../models/Session");

const queries = {
	// USER QUERIES
	getUserData: async (_, args, { currentUser }) => {
		if (!currentUser) {
			const error = new Error("Not authenticated");
			error.statusCode = 403;
			throw error;
		}
		const user = await User.findById(currentUser.userId);
		return {
			...user._doc,
			createdAt: user.createdAt.toISOString().split("T")[0],
			updatedAt: user.updatedAt.toISOString().split("T")[0]
		};
	},
	isAuth: async (_, { token }, {}) => {
		try {
			await jwt.verify(token, process.env.SECRET);
			return true;
		} catch (err) {
			return false;
		}
	},
	// SESSION QUERIES
	getSessionByID: async (_, { sessionId }, { currentUser }) => {
		// Find session
		const session = await Session.findById(sessionId).populate("creator");
		if (!session) {
			const error = new Error("Session not found.");
			error.statusCode = 404;
			throw error;
		}
		// Validate user
		if (session.creator._id.toString() !== currentUser.userId) {
			const error = new Error("Not authorized.");
			error.statusCode = 403;
			throw error;
		}
		// Return session
		return {
			...session._doc,
			_id: session._id.toString(),
			createdAt: session.createdAt.toISOString().split("T")[0],
			updatedAt: session.updatedAt.toISOString().split("T")[0]
		};
	},
	getSessionsByTitle: async (_, { title }, { currentUser }) => {
		// Find user by ID and populate user's log
		const user = await User.findById(currentUser.userId).populate("log");
		if (!user) {
			const error = new Error("Not authenticated");
			error.statusCode = 401;
			throw error;
		}
		// Filter log by title
		const filteredSessions = user.log.filter(session => {
			return session.title.includes(title);
		});
		// Return filtered array of sessions
		return filteredSessions.map(session => {
			return {
				...session._doc,
				_id: session._id.toString(),
				createdAt: session.createdAt.toISOString().split("T")[0],
				updatedAt: session.updatedAt.toISOString().split("T")[0],
				creator: {
					...user._doc,
					_id: session._id.toString(),
					createdAt: session.createdAt.toISOString().split("T")[0],
					updatedAt: session.updatedAt.toISOString().split("T")[0]
				}
			};
		});
	},
	getSessionsFromTo: async (_, { fromDate, toDate }, { currentUser }) => {
		// Find user by ID and populate user's log
		const user = await User.findById(currentUser.userId).populate("log");
		if (!user) {
			const error = new Error("Not authenticated");
			error.statusCode = 401;
			throw error;
		}
		// Filter log by sessionDate
		const filteredSessions = user.log.filter(session => {
			return session.sessionDate >= fromDate && session.sessionDate <= toDate;
		});
		// Return filtered array of sessions
		return filteredSessions.map(session => {
			return {
				...session._doc,
				_id: session._id.toString(),
				createdAt: session.createdAt.toISOString().split("T")[0],
				updatedAt: session.updatedAt.toISOString().split("T")[0],
				creator: {
					...user._doc,
					_id: session._id.toString(),
					createdAt: session.createdAt.toISOString().split("T")[0],
					updatedAt: session.updatedAt.toISOString().split("T")[0]
				}
			};
		});
	}
};

module.exports = queries;
