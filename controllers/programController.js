const Program = require("../schemas/program");

exports.createProgram = async (req, res) => {
  try {
    const { title, description, level, courses } = req.body;
    const newProgram = new Program({
      title,
      description,
      level,
      courses,
    });
    await newProgram.save();
    res.status(201).json({ message: "Programme créé avec succès." });
  } catch (error) {
    res.status(500).json({ error: "Erreur lors de la création du programme." });
  }
};

exports.getAllPrograms = async (req, res) => {
  try {
    const programs = await Program.find();
    res.status(200).json(programs);
  } catch (error) {
    res
      .status(500)
      .json({ error: "Erreur lors de la récupération des programmes." });
  }
};

exports.getProgramById = async (req, res) => {
  try {
    const program = await Program.findById(req.params.id);
    if (!program) {
      return res.status(404).json({ message: "Programme non trouvé." });
    }
    res.status(200).json(program);
  } catch (error) {
    res
      .status(500)
      .json({ error: "Erreur lors de la récupération du programme." });
  }
};
