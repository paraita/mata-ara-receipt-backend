const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const purchaseSchema = new Schema({
  receipt: [],
  status: String // "ACTIVE" or "REFUND"
});

const Purchase = mongoose.model('Purchase', purchaseSchema);

module.exports = Purchase;
