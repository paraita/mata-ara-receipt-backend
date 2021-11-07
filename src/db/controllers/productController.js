const Customer = require('../model');

postNewSell = async(req, res) => {
  try {
    const receipt = req.body;
    const sell = await new Customer({
      receipt: receipt,
      status: 'A'
    });
    res.status(200).json(sell);
  } catch (err) {
    if (err) return console.log(err);
  }
};

module.exports = {
  postNewSell
};
