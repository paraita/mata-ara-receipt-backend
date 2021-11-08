const Customer = require('../model');

getAllCustomers = async (req, res) => {
  try {
    const customers = await Customer.find();
    res.status(200).json(customers)
  } catch (err) {
    if (err) return console.log(err);
  }
};

module.exports = {
  getAllCustomers
};
