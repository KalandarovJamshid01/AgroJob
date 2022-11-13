const mongoose = require("mongoose");

const typeSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    userId: {
      type: mongoose.Schema.ObjectId,
      ref: "users",
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
typeSchema.pre("save", function (next) {
  const month = this.createdAt.getUTCMonth() + 1;
  const day = this.createdAt.getUTCDate();
  const year = this.createdAt.getUTCFullYear();
  this.time = day + "." + month + "." + year;
  next();
});

typeSchema.virtual("users", {
  ref: "users",
  foreignField: "_id",
  localField: "userId",
});

const Type = mongoose.model("types", typeSchema);

module.exports = Type;
