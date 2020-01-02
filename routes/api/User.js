const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../../models/User');

// @route Post /api/users
// @desc Register an User
// @access public
exports.post = async (req, res) => {
  const { name, email, password } = req.body;

  // Simple validation
  if (!name || !email || !password) {
    return res.status(400).json({ msg: 'Please enter all fields' });
  }

  // Check for existing user
  const user = await User.findOne({ email });
  if (user) return res.status(400).json({ msg: 'User already exists' });

  const newUser = new User({ name, email, password });

  // Create Salt & hash
  // eslint-disable-next-line no-useless-catch
  try {
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(newUser.password, salt);
    newUser.password = hash;
    const savedUser = await newUser.save();
    const { _id } = savedUser;
    const token = await jwt.sign({ id: _id }, process.env.JWTSECRET, { expiresIn: 3600 });
    return res.json({
      token,
      name: savedUser.name,
      email: savedUser.email,
    });
  } catch (error) {
    throw (error);
  }
};
