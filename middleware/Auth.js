const jwt = require('jsonwebtoken');

function auth(req, res, next) {
  const token = req.header('x-auth-token');

  // Check for token
  if (!token) return res.status(401).send('No token, access denied');

  try {
    // Verify token
    const decoded = jwt.verify(token, process.env.JWTSECRET);

    // Add user from payload
    req.user = decoded;
    return next();
  } catch (error) {
    return res.status(400).send('Token invalid, access denied');
  }
}

module.exports = auth;
