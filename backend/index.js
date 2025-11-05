import express from "express";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();

import "./db.js";
import User from "./model/user.model.js";

const app = express();

// ✅ Body parser must be here BEFORE routes
app.use(express.json());

// ✅ CORS
app.use(
  cors({
    origin: process.env.FRONT_END_URL || "http://localhost:5173",
    methods: ["POST", "GET", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

// ✅ Insert User API
app.post("/add-user", async (req, res) => {
  try {
    const { name, email } = req.body;

    const user = await User.create({ name, email });

    res.json({
      message: "✅ User inserted successfully",
      data: user,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.listen(3000, () =>
  console.log("🚀 Server running on http://localhost:3000")
);
