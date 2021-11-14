const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const purchaseSchema = new Schema({
  receipt: [],
  status: String // "A"= Active,  "R"= Refund
});

const Purchase = mongoose.model('Customer', purchaseSchema);

module.exports = Purchase;
