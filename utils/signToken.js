const jwt = require("jsonwebtoken");

const signToken = async (userId, email) => {
  return await jwt.sign(
    {
      userId,
      email
    },
    process.env.SECRET,
    {
      expiresIn: "1d"
    }
  );
};

module.exports = signToken;
