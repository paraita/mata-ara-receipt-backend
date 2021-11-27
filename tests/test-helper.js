const server = require('../src/db/index');
const Purchase = require('../src/db/model');

const setup = () => {
  before(async () => {
    try {
      await server.connectInMemory();
    } catch (err) {
      console.log(err);
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

postPurchase = (receipt) => {
  const newPurchase = new Purchase({
    receipt: receipt,
    status: 'ACTIVE'
  });
  return newPurchase.save();
};


module.exports = {
  setup,
  postPurchase
};
