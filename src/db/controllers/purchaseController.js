const Purchase = require('../model');

getAllPurchases = async (req, res) => {
  try {
    const purchases = await Purchase.find();
    res.status(200).json(purchases)
  } catch (err) {
    if (err) return console.log(err);
  }
};

getPurchase = async (req, res) => {
  try {
    const purchase = await Purchase.find(req.params.id);
    res.status(200).json(purchase)
    //TODO: what if it doesn't exist ?
  } catch (err) {
    if (err) return console.log(err);
  }
};

createPurchase = async(req, res) => {
  try {
    const receipt = req.body;
    const purchase = await new Purchase({
      receipt: receipt,
      status: 'ACTIVE'
    });

    //TODO: verifier que le recu n'existe pas déjà !
    // on retournera un 200 oklm

    await purchase.save();
    res.status(201).json(purchase);
  } catch (err) {
    if (err) return console.log(err);
  }
};

//TODO: update purchase when refund is issued by Apple (wtf is the callback uri format and payload lookalike ?)

module.exports = {
  getAllPurchases,
  getPurchase,
  createPurchase
};
