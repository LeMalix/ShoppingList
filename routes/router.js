const express = require('express');
const Item = require('./api/Item');

const router = express.Router();

// Item
router.get('/api/items', Item.get);
router.post('/api/items', Item.post);
router.delete('/api/items/:id', Item.delete);

module.exports = router;
