const express = require('express');
const mongoose = require('mongoose');
const { v4: uuidv4 } = require('uuid');

const app = express();
const cors=require('cors');
app.use(cors())
app.use(express.json());

// MongoDB Connection
mongoose
  .connect("mongodb+srv://saravanakarthiek39:Karthiek123@myfirstcluster.epffo.mongodb.net/")
  .then(() => {
    console.log("Database connected");
  })
  .catch((err) => {
    console.error("Database connection failed:", err);
  });

  // Feedback Schema
const feedbackSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true },
  date: { type: Date, required: true }, // Corrected `Date` type
  college: { type: String, required: true },
  program: { type: String, required: true },
  content: { type: String, required: true },
  improve: { type: String }, // Optional field for improvement suggestions
  rating: { type: Number, min: 1, max: 5, required: true }, // Rating must be between 1 and 5
});

// Feedback Model
const Feedback = mongoose.model("Feedback", feedbackSchema);

// POST route to submit feedback
app.post("/api/feedback", async (req, res) => {
  try {
    const { date, college, program, content, improve, rating } = req.body;

    // Validate rating
    if (rating < 1 || rating > 5) {
      return res.status(400).json({ message: "Rating must be between 1 and 5" });
    }

    // Create a new feedback entry
    const newFeedback = new Feedback({
      id: uuidv4(),
      date: new Date(date), // Ensure the date is properly parsed
      college,
      program,
      content,
      improve,
      rating,
    });

    // Save feedback to the database
    await newFeedback.save();
    res.status(201).json({ message: "Feedback submitted successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to submit feedback" });
  }
});

// GET route to fetch all feedback
app.get("/api/feedback", async (req, res) => {
  try {
    const feedbacks = await Feedback.find();
    res.status(200).json(feedbacks);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to fetch feedback" });
  }
});


// College Schema and Routes
const collegeSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true },
  college: { type: String, required: true },
  program: { type: [String], required: true },
});
const College = mongoose.model("College", collegeSchema);

app.post("/api/college", async (req, res) => {
  try {
    const { college, program } = req.body;

    const newCollege = new College({
      id: uuidv4(),
      college,
      program,
    });

    await newCollege.save();
    res.status(201).json({ message: "College submitted successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to submit college" });
  }
});

app.get("/api/college", async (req, res) => {
  try {
    const colleges = await College.find();
    res.status(200).json(colleges);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to fetch colleges" });
  }
});

// Prerequisite Schema and Routes
const prerequisiteSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true },
  college: { type: String, required: true },
  program: { type: String, required: true },
  msg: { type: String, required: true },
  src: { type: String, required: true },
});
const Prerequisite = mongoose.model("Prerequisite", prerequisiteSchema);

app.post("/api/prerequisite", async (req, res) => {
  try {
    const { college, program, msg, src } = req.body;

    const newPrerequisite = new Prerequisite({
      id: uuidv4(),
      college,
      program,
      msg,
      src,
    });

    await newPrerequisite.save();
    res.status(201).json({ message: "Prerequisite submitted successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to submit prerequisite" });
  }
});

app.get("/api/prerequisite", async (req, res) => {
  try {
    const prerequisites = await Prerequisite.find();
    res.status(200).json(prerequisites);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to fetch prerequisites" });
  }
});

app.delete("/api/prerequisite", async (req, res) => {
  try {
    await Prerequisite.deleteMany();
    res.status(200).json({ message: "All prerequisites deleted successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to delete prerequisites" });
  }
});

// Task Schema and Routes
const taskSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true },
  college: { type: String, required: true },
  program: { type: String, required: true },
  task: { type: String, required: true },
  date: { type: Date, required: true },
});
const Task = mongoose.model("Task", taskSchema);

app.post("/api/task", async (req, res) => {
  try {
    const { college, program, task, date } = req.body;

    const newTask = new Task({
      id: uuidv4(),
      college,
      program,
      task,
      date: new Date(date),
    });

    await newTask.save();
    res.status(201).json({ message: "Task submitted successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to submit task" });
  }
});

app.get("/api/task", async (req, res) => {
  try {
    const tasks = await Task.find();
    res.status(200).json(tasks);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to fetch tasks" });
  }
});

app.delete("/api/task", async (req, res) => {
  try {
    console.log("Deleting all tasks");
    await Task.deleteMany();
    res.status(200).json({ message: "All tasks deleted successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to delete tasks" });
  }
});   

// Notes Schema and Routes
const notesSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true },
  college: { type: String, required: true },
  program: { type: String, required: true },
  title: { type: String, required: true },
  link: { type: String, required: true },
});
const Notes = mongoose.model("Notes", notesSchema);

app.post("/api/notes", async (req, res) => {
  try {
    const { college, program, title, link } = req.body;

    const newNotes = new Notes({
      id: uuidv4(),
      college,
      program,
      title,
      link,
    });

    await newNotes.save();
    res.status(201).json({ message: "Notes submitted successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to submit notes" });
  }
});

app.get("/api/notes", async (req, res) => {
  try {
    const notes = await Notes.find();
    res.status(200).json(notes);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to fetch notes" });
  }
});

app.delete("/api/notes", async (req, res) => {
  try {
    await Notes.deleteMany();
    res.status(200).json({ message: "All notes deleted successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to delete notes" });
  }
});

// Resource Schema and Routes
const resourceSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true },
  college: { type: String, required: true },
  program: { type: String, required: true },
  title: { type: String, required: true },
  link: { type: String, required: true },
});
const Resource = mongoose.model("Resource", resourceSchema);

app.post("/api/resource", async (req, res) => {
  try {
    const { college, program, title, link } = req.body;

    const newResource = new Resource({
      id: uuidv4(),
      college,
      program,
      title,
      link,
    });

    await newResource.save();
    res.status(201).json({ message: "Resource submitted successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to submit resource" });
  }
});

app.get("/api/resource", async (req, res) => {
  try {
    const resources = await Resource.find();
    res.status(200).json(resources);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to fetch resources" });
  }
});

app.delete("/api/resource", async (req, res) => {
  try {
    await Resource.deleteMany();
    res.status(200).json({ message: "All resources deleted successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to delete resources" });
  }
});

// Start the server
app.listen(3000, () => {
  console.log("Server is running on http://localhost:3000");
});