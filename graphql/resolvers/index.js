// Resolvers
const queries = require("./queries");
const mutations = require("./mutations");

// Custom scalars
const DateScalar = require("./DateScalar");

module.exports = {
  Date: DateScalar,
  Query: queries,
  Mutation: mutations
};
