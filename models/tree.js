const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const treeSchema = new Schema({
  name: {
    type: String,
    required: [true, 'You don`t provide a name'],
  },
  price: {
    type: Number,
    required: true,
  },
  count: {
    type: Number,
    required: true,
  },
  available: {
    type: Boolean,
    default: false,
  },
});

const Tree = mongoose.model('tree', treeSchema);

module.exports = Tree;
