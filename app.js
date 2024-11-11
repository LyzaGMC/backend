require("dotenv").config();
const userRoutes = require("./routes/userRoutes"); // Import program routes
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
app.use(cors(
{
  origin : ["https://frontend-app-exgv.onrender.com"]
}

)); // Enable CORS for all routes

// Middleware to parse JSON bodies
app.use(express.json());

// MongoDB Atlas connection string from .env
const dbUri = process.env.MONGODB_URI;

// Connect to MongoDB Atlas
mongoose
  .connect(dbUri)
  .then(() => console.log("Connected to MongoDB Atlas"))
  .catch((err) => console.error("Could not connect to MongoDB Atlas:", err));

// Define Course schema and model
/*const courseSchema = new mongoose.Schema({
  title: String,
  description: String,
  duration: Number,
}); */

//const Course = mongoose.model("Course", courseSchema);

// Use the program routes

app.use("/users", userRoutes);
//app.use("/programs", programRoutes);
//app.use("/programs", programRoutes);
//app.use("/programs", programRoutes);
//app.use("/programs", programRoutes);
//app.use("/programs", programRoutes);

// CRUD Operations

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
