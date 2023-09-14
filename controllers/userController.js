import User from "../models/User";
export const registerUser = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;
    // check user exists or not
    let user = await User.findOne({ email });
    if (user) {
      throw new Error("User already registered");
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
    next(error);
  }
};
