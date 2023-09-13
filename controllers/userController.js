import User from "../models/User";
export const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    // check user exists or not
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ message: "User already registered" });
    }
    // creating new user
    user = await User.create({ name, email, password });
    res.status(201).json({
      _id: user._id,
      avatar: user.avatar,
      name: user.name,
      email: user.email,
      verified: user.verified,
      admin: user.admin,
      token: await user.generateJWT(),
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
