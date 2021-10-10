helloWorld = (req, res) => {
  res.json({hello: 'world'});
};

verifyReceipt = (encoded_receipt, shared_secret) => {
  const requestBody = {

  }
};

module.exports = {
  helloWorld,
  verifyReceipt,
};