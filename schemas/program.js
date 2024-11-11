const mongoose = require("mongoose");

const ProgramSchema = new mongoose.Schema(
  {
    title: { type: String, required: true }, // ex. Programme structuré
    description: { type: String, required: true },
    level: {
      type: String,
      enum: ["beginner", "intermediate", "advanced"],
      default: "beginner",
    }, // Pour structuré seulement
    type: {
      type: String,
      enum: ["structured", "free_discussion", "business_english"],
      required: true,
    },
    domain: { type: String }, // Pour l'anglais des affaires
    courses: [
      {
        title: { type: String, required: true },
        description: { type: String, required: true },
        content: { type: String, required: true },
      },
    ],
  },
  { timestamps: true }
);

const Program = mongoose.model("Program", ProgramSchema);
module.exports = Program;
