import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      serverSelectionTimeoutMS: 5000,
    });
    console.log("✅ MongoDB Connected Successfully Bro!");
  } catch (err) {
    console.log("❌ MongoDB Error:", err);
  }
};

connectDB();

export default mongoose;
