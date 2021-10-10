const app = require('./app');
const server = require('./src/db/index');
const { name, db } = require('./config');
const PORT = 5000;

const listen = app.listen(PORT, () => {
  const msg = `Application is running on http://localhost:${PORT}`;
  console.log(msg);
});

const main = async () => {
  try {
    await server.connect(db, name);
    return listen;
  } catch (err) {
    console.log(err);
  }
};

if (require.main === module) {
  return main();
};