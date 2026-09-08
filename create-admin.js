require('dotenv').config();
const mongoose = require('mongoose');
const User = require('./src/models/user.model');

async function createAdmin() {
  const email = process.argv[2] || 'admin@example.com';
  const password = process.argv[3] || 'admin123';
  const username = process.argv[4] || 'admin';

  try {
    const mongoUri = process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/portfolio";
    console.log(`Connecting to MongoDB...`);
    await mongoose.connect(mongoUri);
    console.log(`Connected to MongoDB.`);

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      existingUser.password = password;
      await existingUser.save();
      console.log(`Updated existing user (${email}) password to: ${password}`);
    } else {
      const user = await User.create({ username, email, password });
      console.log(`Created admin user successfully:`);
      console.log(`  Username: ${user.username}`);
      console.log(`  Email:    ${user.email}`);
      console.log(`  Password: ${password}`);
    }
    process.exit(0);
  } catch (err) {
    console.error(`Failed to create admin user:`, err);
    process.exit(1);
  }
}

createAdmin();
