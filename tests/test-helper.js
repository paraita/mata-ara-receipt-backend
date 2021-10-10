const server = require('../src/db/index');

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

module.exports = setup;