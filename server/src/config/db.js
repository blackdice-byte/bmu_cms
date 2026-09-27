const mongoose = require('mongoose');

// If MONGO_URI is set (a real MongoDB instance or Atlas cluster), we use it -
// data persists normally. If it's not set, we spin up a temporary in-memory
// MongoDB so this demo runs with zero external setup (data resets on restart,
// and the server auto-seeds it - see server.js).
let memoryServer;

const connectDB = async () => {
  let uri = process.env.MONGO_URI;
  let usingMemoryServer = false;

  if (!uri) {
    const { MongoMemoryServer } = require('mongodb-memory-server');
    memoryServer = await MongoMemoryServer.create({ instance: { dbName: 'bmu_cms' } });
    uri = memoryServer.getUri();
    usingMemoryServer = true;
    console.log('No MONGO_URI set - starting a temporary in-memory MongoDB for this session.');
  }

  try {
    await mongoose.connect(uri);
    console.log(`MongoDB connected: ${mongoose.connection.host}/${mongoose.connection.name}`);
  } catch (err) {
    console.error(`MongoDB connection error: ${err.message}`);
    process.exit(1);
  }

  return { usingMemoryServer };
};

const disconnectDB = async () => {
  await mongoose.disconnect();
  if (memoryServer) await memoryServer.stop();
};

module.exports = connectDB;
module.exports.disconnectDB = disconnectDB;
