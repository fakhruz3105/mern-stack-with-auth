const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ItemSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  amount: {
    type: Number,
    min: [1, 'At least 1 item'],
    default: 1,
  },
  date: {
    type: Date,
    default: Date.now
  }
});

const Item = mongoose.model('shoppingItem', ItemSchema);
module.exports = Item;