const Purchase = require('../model');

getAllPurchases = async (req, res) => {
  try {
    const purchases = await Purchase.find();
    res.status(200).json(purchases)
  } catch (err) {
    if (err) return console.log(err);
  }
};

module.exports = {
  getAllPurchases
};
