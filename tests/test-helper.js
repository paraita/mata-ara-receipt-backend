const server = require('../src/db/index');
const Customer = require('../src/db/model');

const setup = () => {
  before(async () => {
    try {
      await server.connect();
    } catch (err) {
      console.log(err)
    }
  });

  beforeEach(async () => {
    try {
      await server.clearDatabase();
    } catch (err) {
      console.log(err);
    }
  });

  after(async() => {
    try {
      await server.close();
    } catch (err) {
      console.log(err);
    }
  });
};


postReceipt = (receipt) => {
  const newSell = new Customer({
    receipt: receipt,
    status: 'A'
  });
  return newSell.save()
};


module.exports = {
  setup,
  postReceipt
};
