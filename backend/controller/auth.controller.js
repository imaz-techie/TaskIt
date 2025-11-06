import bcryptjs from "bcryptjs";
import User from "../model/user.model.js";

const signup = async (req, res) => {
  const { name, email, password, profileImageUrl, adminJoinCode } = req.body;

  // validation
  if (
    !name ||
    !email ||
    !password ||
    name === "" ||
    email === "" ||
    password === ""
  ) {
    return res.status(400).json({ message: "All fields are required" });
  }

  // User Exist
  const isAlreadyExist = await User.findOne({ email });

  if (isAlreadyExist) {
    return res
      .status(400)
      .json({ success: false, message: "User already exist" });
  }

  // check role
  let role = "user";
  if (adminJoinCode && adminJoinCode === process.env.ADMIN_JOIN_CODE) {
    role = "admin";
  }

  const hashedPassword = bcryptjs.hashSync(password, 10);

  const newUser = User({
    name,
    email,
    password: hashedPassword,
    profileImageUrl,
    role,
  });

  try {
    await newUser.save();
    res.json("SignUp Successful");
  } catch (error) {
    res.status(500).json({ message: error.message() });
  }
};

export default signup;
