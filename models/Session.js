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
        name: {
          type: String,
          required: true
        },
        sets: [
          {
            setQty: {
              type: Number,
              required: true
            },
            repQty: {
              type: Number,
              required: true
            },
            weigth: {
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
