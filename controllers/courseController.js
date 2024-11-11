const Course = require("../schemas/course");
const Program = require("../schemas/program");

exports.addCourse = async (req, res) => {
  try {
    const { title, description, content } = req.body;
    const { programId } = req.params;
    const program = await Program.findById(programId);
    if (!program) {
      return res.status(404).json({ message: "Programme non trouvé." });
    }
    const newCourse = new Course({ title, description, content, programId });
    await newCourse.save();
    res.status(201).json({ message: "Cours ajouté avec succès." });
  } catch (error) {
    res.status(500).json({ error: "Erreur lors de l'ajout du cours." });
  }
};

exports.getCoursesByProgram = async (req, res) => {
  try {
    const courses = await Course.find({ programId: req.params.programId });
    res.status(200).json(courses);
  } catch (error) {
    res
      .status(500)
      .json({ error: "Erreur lors de la récupération des cours." });
  }
};
