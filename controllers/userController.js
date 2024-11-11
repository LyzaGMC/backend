const User = require("../schemas/user");
const Program = require("../schemas/program");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");
require("dotenv").config(); // Importer dotenv pour utiliser les variables d'environnement
const Form = require("../schemas/form"); // Assurez-vous d'importer votre modèle Form
//form

exports.formContact = async (req, res) => {
  try {
    const { name, email, phone, subject } = req.body;
    const newForm = new Form({ name, email, phone, subject });
    await newForm.save();

    // Configure the transporter
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "learnlanga@gmail.com",
        pass: "yrvo gkyu ngcs fhlx",
      },
    });

    // Configure the email
    const mailOptions = {
      from: "learnlanga@gmail.com",
      to: "learnlanga@gmail.com",
      subject: `[projetgmc] New Form Submission: ${subject}`,
      text: `Hello,\n\nYou have received a new form submission from ${name}.\n\nContact details:\nEmail: ${email}\nPhone: ${phone}\n\nSubject: ${subject}\n\nThanks,\nprojetgmc`,
      html: `<p>Hello,</p><p>You have received a new form submission from <strong>${name}</strong>.</p><p><strong>Contact details:</strong><br>Email: ${email}<br>Phone: ${phone}</p><p><strong>Subject:</strong> ${subject}</p><p>Thanks,<br>Projet GMC</p>`,
    };

    // Send the email
    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log("Error while sending email:", error);
        return res
          .status(500)
          .json({ errorMessage: "Error sending email.", error: error });
      } else {
        console.log("Email sent:", info.response);
        return res.status(201).json({
          message:
            "Merci pour votre validation. Un modérateur vous contactera sous peu.",
        });
      }
    });
  } catch (error) {
    console.error("Error in form submission:", error);
    res.status(500).json({ error: "Erreur au cours de la validation." });
  }
};

//signup
exports.signup = async (req, res) => {
  try {
    const { name, email, phone, password, role } = req.body;

    // Check for missing fields
    if (!name || !email || !phone || !password || !role) {
      return res
        .status(400)
        .json({ message: "Tous les champs sont requis.", success: false });
    }

    // Check if the email is already used
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res
        .status(400)
        .json({ message: "L'email est déjà utilisé.", success: false });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new user
    const newUser = new User({
      name,
      email,
      phone,
      password: hashedPassword,
      role,
    });
    await newUser.save();

    // Success response
    res
      .status(201)
      .json({ message: "Utilisateur inscrit avec succès.", success: true });
  } catch (error) {
    // General error handling with detailed messages
    console.error("Erreur lors de l'inscription:", error);
    res
      .status(500)
      .json({ message: "Erreur lors de l'inscription.", success: false });
  }
};

//login
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res
        .status(400)
        .json({ message: "Identifiants invalides.", success: false });
    }
    const token = jwt.sign({ userId: user._id }, "secret", {
      expiresIn: "30d",
    });
    res.status(200).json({ message: token, success: true });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Erreur lors de la connexion.", success: false });
  }
};

exports.enrollProgram = async (req, res) => {
  try {
    const userId = req.userId; // obtenu via le middleware auth
    const { programId } = req.params;
    const program = await Program.findById(programId);
    if (!program) {
      return res.status(404).json({ message: "Programme non trouvé." });
    }
    await User.findByIdAndUpdate(userId, {
      $push: { enrolledPrograms: { programId } },
    });
    res.status(200).json({ message: "Enrôlé avec succès dans le programme." });
  } catch (error) {
    res.status(500).json({ error: "Erreur lors de l'enrôlement." });
  }
};
