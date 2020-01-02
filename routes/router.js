const express = require('express');
const Auth = require('./api/Auth');
const Item = require('./api/Item');
const User = require('./api/User');
const auth = require('../middleware/Auth');

const router = express.Router();

// Item
router.get('/api/items', Item.get);
router.post('/api/items', auth, Item.post);
router.delete('/api/items/:id', auth, Item.delete);

// User
router.post('/api/users', User.post);

// Auth
router.post('/api/auth', Auth.post);
router.get('/api/auth/users', auth, Auth.getUser);

module.exports = router;
