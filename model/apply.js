const mongoose = require("mongoose");
const applySchema = mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    jobId: {
      type: String,
      required: true,
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
    timestamps: true,
  }
);

applySchema.virtual("users", {
  ref: "users",
  localField: "userId",
  foreignField: "_id",
});

const Apply = mongoose.model("applies", applySchema);

module.exports = Apply;
