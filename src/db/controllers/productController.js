const Customer = require('../model');

// A = Active
// R = Refund

postNewSell = async(req, res) => {
  try {
    const receipt = req.body;
    const sell = await new Customer({
      sell_id: receipt.appAccountToken,
      receipt: receipt,
      status: 'A'
    });
    await sell.save();
    res.status(200).json(sell);
  } catch (err) {
    if (err) return console.log(err);
  }
};

updateSell = async (req, res) => {
  try {
    const id = req.body.appAccountToken;
    const updateStatus = {sell_id: id, status: 'R'};
    const customer = await Customer.findOneAndUpdate({
      'appAccountToken': id
    }, updateStatus, {
      new: true
    });
    res.status(200).json(customer);
  } catch (err) {
    if (err) return console.log(err);
  }
};

module.exports = {
  postNewSell,
  updateSell
};
