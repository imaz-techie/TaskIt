import mongoose from "../db.js";

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    profileImageUrl: {
      type: String,
      default:
        "https://www.freepik.com/free-vector/user-circles-set_145856997.htm#fromView=search&page=1&position=0&uuid=d1d48756-998c-461b-aace-a21c1c9fae18&query=User+profile+image+cdn",
    },
    role: { type: String, enum: ["admin", "user"], default: "user" },
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);

export default User;
