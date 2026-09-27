require('dotenv').config();
const app = require('./app');
const connectDB = require('./config/db');
const User = require('./models/User');
const { seedDatabase } = require('./utils/seed');

const PORT = process.env.PORT || 5000;

const start = async () => {
  const { usingMemoryServer } = await connectDB();

  // Auto-seed demo data whenever the database is empty - this is always the
  // case for the zero-config in-memory MongoDB fallback, and is a harmless
  // no-op on a real MONGO_URI that already has data.
  const userCount = await User.countDocuments();
  if (userCount === 0) {
    console.log(usingMemoryServer ? 'Seeding in-memory database with demo data...' : 'Database is empty, seeding demo data...');
    await seedDatabase();
  }

  app.listen(PORT, () => {
    console.log(`BMU CMS API running on http://localhost:${PORT}`);
  });
};

start();
