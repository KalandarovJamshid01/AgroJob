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
    time: {
      type: String,
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
    timestamps: true,
  }
);
applySchema.pre("save", function (next) {
  const month = this.createdAt.getUTCMonth() + 1;
  const day = this.createdAt.getUTCDate();
  const year = this.createdAt.getUTCFullYear();
  this.time = day + "." + month + "." + year;
  next();
});

applySchema.virtual("users", {
  ref: "users",
  localField: "userId",
  foreignField: "_id",
});

const Apply = mongoose.model("applies", applySchema);

module.exports = Apply;
