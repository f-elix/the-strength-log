// Packages
const bcrypt = require("bcryptjs");
const validator = require("validator");

// Models
const User = require("../../models/User");
const Session = require("../../models/Session");

// Utils
const signToken = require("../../utils/signToken");

const mutations = {
	// USER MUTATIONS
	signupUser: async (_, { name, email, password }) => {
		// Validate input
		const error = new Error();
		error.statusCode = 400;
		if (!validator.isEmail(email)) {
			error.message = "Invalid email address.";
			throw error;
		}
		const existingUser = await User.findOne({ email });
		if (existingUser) {
			error.message = "This email address is already taken.";
			throw error;
		}
		if (!validator.isLength(password, { min: 6 })) {
			error.message = "Password must have at least 6 characters.";
			throw error;
		}
		// Hash password
		const hashedPassword = await bcrypt.hash(password, 10);
		// Create and save user to DB
		const newUser = new User({
			name,
			email,
			password: hashedPassword
		});
		await newUser.save();
		// Assign token
		const token = await signToken(newUser._id.toString(), newUser.email);
		// Return user auth data
		return {
			userId: newUser._id.toString(),
			token
		};
	},
	loginUser: async (_, { email, password }) => {
		// Validate input
		const error = new Error();
		error.statusCode = 400;
		if (!validator.isEmail(email)) {
			error.message = "Invalid email address.";
			throw error;
		}
		// Find user
		const user = await User.findOne({ email }).populate("log");
		if (!user) {
			error.message = "User not found.";
			error.statusCode = 404;
			throw error;
		}
		// Verify password
		let isPasswordValid;
		try {
			isPasswordValid = await bcrypt.compare(password, user.password);
		} catch (err) {
			throw err;
		}
		if (!isPasswordValid) {
			error.message = "Invalid password.";
			throw error;
		}
		// Assign token
		const token = await signToken(user._id.toString(), user.email);
		// Return user auth data
		return {
			userId: user._id.toString(),
			token
		};
	},
	// SESSION MUTATIONS
	createSession: async (_, { sessionDate }, { currentUser }) => {
		if (!currentUser) {
			const error = new Error("Not authenticated");
			error.statusCode = 401;
			throw error;
		}
		const user = await User.findById(currentUser.userId);
		const session = new Session({
			title: "New session",
			sessionDate,
			creator: currentUser.userId,
			newSession: true
		});
		const newSession = await session.save();
		user.log.push(newSession);
		await user.save();
		return {
			...newSession._doc,
			_id: newSession._id.toString(),
			createdAt: newSession.createdAt.toISOString().split("T")[0]
		};
	},
	saveSession: async (_, { sessionData }, { currentUser }) => {
		// Find session
		const session = await Session.findById(sessionData._id).populate("creator");
		if (!session) {
			const error = new Error("No session found.");
			error.statusCode = 404;
			throw error;
		}
		// Validate user
		if (session.creator._id.toString() !== currentUser.userId) {
			const error = new Error("Not authorized.");
			error.statusCode = 403;
			throw error;
		}
		// Update session
		session.title = sessionData.title;
		session.sessionDate = sessionData.sessionDate;
		session.exercises = sessionData.exercises;
		session.notes = sessionData.notes;
		session.newSession = false;
		const updatedSession = await session.save();
		// Return session
		return {
			...updatedSession._doc,
			_id: updatedSession._id.toString(),
			createdAt: updatedSession.createdAt.toISOString().split("T")[0],
			updatedAt: updatedSession.updatedAt.toISOString().split("T")[0]
		};
	},
	deleteSession: async (_, { sessionId }, { currentUser }) => {
		// Find session
		const session = await Session.findById(sessionId);
		if (!session) {
			const error = new Error("Session does not exist.");
			error.statusCode = 404;
			throw error;
		}
		// Validate user
		if (session.creator.toString() !== currentUser.userId) {
			const error = new Error("Not authorized.");
			error.statusCode = 403;
			throw error;
		}
		// Delete session
		await Session.findByIdAndRemove(sessionId);
		// Update user docs
		const user = await User.findById(currentUser.userId);
		user.log.pull(sessionId);
		await user.save();
		// Return
		return true;
	}
};

module.exports = mutations;
