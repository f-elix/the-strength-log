const mongoose = require("mongoose");

const SessionSchema = new mongoose.Schema(
	{
		title: {
			type: String,
			required: true
		},
		sessionDate: {
			type: Date,
			required: true
		},
		exercises: [
			{
				id: {
					type: Number,
					required: true
				},
				name: {
					type: String,
					required: true
				},
				sets: [
					{
						id: {
							type: Number,
							required: true
						},
						setQty: {
							type: Number,
							required: true
						},
						repQty: {
							type: Number,
							required: true
						},
						weight: {
							type: String,
							required: true
						}
					}
				]
			}
		],
		notes: {
			type: String
		},
		creator: {
			type: mongoose.Schema.Types.ObjectId,
			required: true,
			ref: "User"
		}
	},
	{
		timestamps: true
	}
);

module.exports = mongoose.model("Session", SessionSchema);
