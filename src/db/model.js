const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const customerSchema = new Schema({
  receipt: [],
  status: String // "A"= Active,  "R"= Refund
});

const Customer = mongoose.model('Customer', customerSchema);

module.exports = Customer;
