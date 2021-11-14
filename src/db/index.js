const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');
const env = process.env.NODE_ENV;

const connect = async (db, name) => {
  try {
    if (env !== 'test') {
      await mongoose.connect(db);
      console.log(`Connected to ${name} database (real mongodb server)`);
    } else {
      const mockDB = await MongoMemoryServer.create();
      const uri = mockDB.getUri();
      await mongoose.connect(uri);
    }
  } catch (err) {
    console.log(err);
  }
};

const close = async () => {
  try {
    await mongoose.disconnect();
  } catch (err) {
    console.log(err);
  }
};

clearDatabase = async () => {
  try {
    const collections = mongoose.connection.collections;
    for (const key in collections) {
      const collection = collections[key];
      collection.deleteMany(null, null, (err) => {
        if (err) return console.log(err);
      });
    }
  }catch (err) {
    console.log(err)
  }
}

module.exports = { connect, close, clearDatabase };
