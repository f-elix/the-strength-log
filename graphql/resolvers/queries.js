// Packages
const jwt = require("jsonwebtoken");

// Models
const User = require("../../models/User");
const Session = require("../../models/Session");

const queries = {
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
  getSessionByDate: async (_, { sessionDate }, { currentUser }) => {
    // Find session by date and user ID
    let session = null;
    try {
      session = await Session.findOne({
        sessionDate,
        creator: currentUser.userId
      }).populate("creator");
    } catch (err) {
      if ((err.kind = "ObjectId")) {
        const error = new Error("Invalid user");
        error.statusCode = 403;
        throw error;
      }
    }
    if (!session) {
      const error = new Error("Session not found.");
      error.statusCode = 404;
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
  },
  isAuth: async (_, { token }, {}) => {
    try {
      await jwt.verify(token, process.env.SECRET);
      return true;
    } catch (err) {
      return false;
    }
  }
};

module.exports = queries;
