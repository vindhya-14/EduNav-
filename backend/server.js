require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const { spawn } = require("child_process");
const { MongoClient, ObjectId } = require("mongodb");
const morgan = require("morgan");
const path = require("path");

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(morgan("dev"));

const PORT = process.env.PORT || 5000;
const MONGO_URI =
  process.env.MONGO_URI || "mongodb://localhost:27017/career_db";

let dbClient;
let db;

// Connect to MongoDB
async function connectMongo() {
  dbClient = new MongoClient(MONGO_URI);
  await dbClient.connect();
  db = dbClient.db();
  console.log("Connected to MongoDB");
}
connectMongo().catch((err) => {
  console.error("Failed to connect to MongoDB:", err);
  process.exit(1);
});

// Run Python script with JSON input
function runPythonPredict(inputObj) {
  return new Promise((resolve, reject) => {
    const pyPath =
      process.env.PYTHON_PATH ||
      "C:/Users/rupes/Downloads/Career/train_model/venv/Scripts/python.exe";
    const scriptPath = path.join(__dirname, "predict.py");

    const pyProc = spawn(pyPath, [scriptPath], {
      cwd: __dirname,
      stdio: ["pipe", "pipe", "pipe"],
    });

    let stdout = "";
    let stderr = "";

    pyProc.stdout.on("data", (data) => (stdout += data.toString()));
    pyProc.stderr.on("data", (data) => (stderr += data.toString()));

    pyProc.on("close", (code) => {
      if (code !== 0) {
        return reject(
          new Error(
            `Python exited with code ${code}\nSTDERR:\n${stderr}\nSTDOUT:\n${stdout}`
          )
        );
      }
      try {
        const result = JSON.parse(stdout);
        resolve(result);
      } catch (err) {
        reject(
          new Error(
            `Failed to parse Python output: ${err}\nSTDOUT:\n${stdout}\nSTDERR:\n${stderr}`
          )
        );
      }
    });

    pyProc.stdin.write(JSON.stringify(inputObj));
    pyProc.stdin.end();
  });
}

// POST /api/quiz
app.post("/api/quiz", async (req, res) => {
  try {
    const payload = req.body;

    // Validate q1..q30
    const features = [];
    for (let i = 1; i <= 30; i++) {
      const key = `q${i}`;
      const value = payload[key];
      if (value === undefined || value === null)
        return res.status(400).json({ error: `Missing answer for ${key}` });

      const num = Number(value);
      if (isNaN(num))
        return res
          .status(400)
          .json({ error: `Invalid answer for ${key}: ${value}` });

      features.push(num);
    }

    // Model paths
    const modelPath =
      process.env.MODEL_PATH || path.join(__dirname, "models/career_model.pkl");
    const encoderPath =
      process.env.ENCODER_PATH ||
      path.join(__dirname, "models/label_encoder.pkl");

    const pythonInput = {
      features,
      top_n: Number(process.env.TOP_N || 3),
      model_path: modelPath,
      encoder_path: encoderPath,
    };

    const prediction = await runPythonPredict(pythonInput);

    // Save to MongoDB with top careers
    const submissions = db.collection("submissions");
    const insertRes = await submissions.insertOne({
      answers: payload,
      features,
      predicted_career: prediction.predicted_career,
      top_careers: prediction.top_careers,
      probabilities: prediction.probabilities,
      meta: { timestamp: new Date(), ip: req.ip },
    });

    res.json({ id: insertRes.insertedId, prediction });
  } catch (err) {
    console.error("Error /api/quiz:", err);
    res.status(500).json({ error: err.message });
  }
});

// GET /api/careers
app.get("/api/careers", async (req, res) => {
  try {
    const careers = await db.collection("careers").find({}).toArray();
    res.json(careers);
  } catch (err) {
    console.error("Error /api/careers:", err);
    res.status(500).json({ error: err.message });
  }
});

// GET /api/careers/:name
app.get("/api/careers/:name", async (req, res) => {
  try {
    const careerName = req.params.name;
    const careers = db.collection("careers");

    // Case-insensitive match, escape special characters
    const career = await careers.findOne({
      name: {
        $regex: new RegExp(
          careerName.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"),
          "i"
        ),
      },
    });

    if (!career) return res.status(404).json({ error: "Career not found" });
    res.json(career);
  } catch (err) {
    console.error("Error /api/careers/:name:", err);
    res.status(500).json({ error: err.message });
  }
});

// GET /api/submission/:id
app.get("/api/submission/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const submissions = db.collection("submissions");
    const doc = await submissions.findOne({ _id: new ObjectId(id) });
    if (!doc) return res.status(404).json({ error: "Not found" });
    res.json(doc);
  } catch (err) {
    console.error("Error /api/submission:", err);
    res.status(500).json({ error: err.message });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
