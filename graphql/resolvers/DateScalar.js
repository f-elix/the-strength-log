// Graphql
const { GraphQLScalarType } = require("graphql");

const DateScalar = new GraphQLScalarType({
	name: "Date",
	description: "A date represented as YYYY-MM-DD",
	serialize: value => value.toISOString().split("T")[0],
	parseValue: value => {
		if (typeof value !== "string" || !value.match(/\d{4}-\d{1,2}-\d{1,2}/)) {
			throw new TypeError(
				`Date value provided should be a string formatted as YYYY-MM-DD. Got ${typeof value} ${JSON.stringify(
					value
				)}.`
			);
		}
		const result = new Date(value);
		if (Number.isNaN(result.getTime())) {
			throw new TypeError(`Value is not a valid date: ${value}`);
		}
		return result;
	},
	parseLiteral: ast => {
		if (typeof ast.value !== "string" || !ast.value.match(/\d{4}-\d{2}-\d{2}/)) {
			throw new TypeError(
				`Date value provided should be a string formatted as YYYY-MM-DD. Got ${typeof ast.value} ${JSON.stringify(
					ast.value
				)}.`
			);
		}
		const result = new Date(ast.value);
		if (Number.isNaN(result.getTime())) {
			throw new TypeError(`Value is not a valid date: ${ast.value}`);
		}
		return result;
	}
});

module.exports = DateScalar;
