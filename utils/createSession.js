// Models
const User = require("../models/User");
const Session = require("../models/Session");

const createSession = async (userId, sessionData) => {
	const user = await User.findById(userId);
	const session = new Session({
		...sessionData,
		creator: userId
	});
	const newSession = await session.save();
	user.log.push(newSession);
	await user.save();
	return {
		...newSession._doc,
		_id: newSession._id.toString(),
		createdAt: newSession.createdAt.toISOString().split("T")[0]
	};
};

module.exports = createSession;
