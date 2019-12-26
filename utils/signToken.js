const jwt = require("jsonwebtoken");

const signToken = async (userId, email) => {
	return await jwt.sign(
		{
			userId,
			email
		},
		process.env.SECRET,
		{
			expiresIn: "30d"
		}
	);
};

module.exports = signToken;
