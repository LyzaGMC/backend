const mongoose = require("mongoose");

const CourseSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    content: { type: String, required: true }, // Texte ou URL de vidéos/documents
    programId: { type: mongoose.Schema.Types.ObjectId, ref: "Program" },
  },
  { timestamps: true }
);

const course = mongoose.model("course", CourseSchema);
module.exports = course;
