const mongoose = require('mongoose');
const MONGO_URL =
  'mongodb+srv://nasa-api:XZGfZJ67vrQB1XI8@cluster0.avszx.mongodb.net/nasa?retryWrites=true&w=majority';

mongoose.connection.once('open', () => {
  console.log('Mongo DB connection ready!');
});

mongoose.connection.on('error', (error) => {
  console.error(error);
});

async function mongoConnect() {
  await mongoose.connect(MONGO_URL, {});
}

async function mongoDisconnect() {
  await mongoose.disconnect();
}

module.exports = {
  mongoConnect,
  mongoDisconnect,
};
