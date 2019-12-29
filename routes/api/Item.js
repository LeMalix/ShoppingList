const Item = require('../../models/Item');

// @route GET /api/items
// @desc Retrieve ALL items
// @access public
exports.get = async (req, res) => {
  try {
    const items = await Item.find()
      .sort({ date: -1 });
    res.json(items);
  } catch (error) {
    res.status(404).json({ message: error });
  }
};

// @route POST /api/items
// @desc Create an item
// @access public 4 now
exports.post = async (req, res) => {
  const item = new Item({
    name: req.body.name,
  });
  try {
    const saveItem = await item.save();
    res.status(201).json(saveItem);
  } catch (error) {
    res.status(404).json({ message: error });
  }
};

// @route DELETE /api/items/:id
// @desc Delete an item
// @access public 4 now
exports.delete = async (req, res) => {
  try {
    const deleteItem = await Item.findById(req.params.id).remove();
    res.status(204).json({ success: true, deleteItem });
  } catch (error) {
    res.status(404).json({ success: false, error });
  }
};
