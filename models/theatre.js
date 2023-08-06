const mongoose = require("mongoose");

const theatreSchema = mongoose.Schema(
  {
    name: { type: String },
    city: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const Theatre = mongoose.model("Theatre", theatreSchema);

module.exports = Theatre;
