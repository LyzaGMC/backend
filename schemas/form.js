const mongoose = require("mongoose");

const formSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    subject: { type: String, required: true },
  },
  { timestamps: true }
);

const form = mongoose.model("Form", formSchema);
module.exports = form;
