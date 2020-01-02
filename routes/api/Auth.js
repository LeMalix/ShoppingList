const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../../models/User');

// @route Post /auth
// @desc Auth user
// @access public
exports.post = async (req, res) => {
  const { email, password } = req.body;

  // Simple validation
  if (!email || !password) {
    return res.status(400).json({ msg: 'Please enter all fields' });
  }

  // Check for existing user
  const user = await User.findOne({ email });
  if (!user) return res.status(400).json({ msg: 'User not exists exists' });

  // Compare passwords
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) return res.status(400).json({ msg: 'Invalid credentials' });

  // Create salt and Hash
  const { _id } = user;
  const token = await jwt.sign({ id: _id }, process.env.JWTSECRET, { expiresIn: 3600 });
  return res.json({
    token,
    name: user.name,
    email: user.email,
  });
};

// @route GET /auth/users
// @desc Register an User
// @access private
exports.getUser = async (req, res) => {
  const { user: { id } } = req;
  const user = await User.findById(id).select('-password');
  return res.json(user);
};
