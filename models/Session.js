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
							type: Number
						},
						repsOrTime: {
							type: String
						},
						weight: {
							type: String
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
		},
		newSession: {
			type: Boolean,
			required: true
		}
	},
	{
		timestamps: true
	}
);

module.exports = mongoose.model("Session", SessionSchema);
