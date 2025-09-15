const mongoose = require('mongoose');
const User = require('./models/User');
const config = require('./config');

async function checkUsers() {
  try {
    console.log('Connecting to MongoDB...');
    await mongoose.connect(config.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    
    console.log('✅ Connected to MongoDB!');
    console.log('Fetching all users...\n');
    
    const users = await User.find({}).select('-password');
    console.log(`Found ${users.length} users in the database:\n`);
    
    users.forEach((user, index) => {
      console.log(`User ${index + 1}:`);
      console.log(`  ID: ${user._id}`);
      console.log(`  Name: ${user.name}`);
      console.log(`  Email: ${user.email}`);
      console.log(`  Student ID: ${user.studentId}`);
      console.log(`  Program: ${user.program}`);
      console.log(`  Created: ${user.createdAt}`);
      console.log('  ---');
    });
    
  } catch (error) {
    console.error('❌ Error:', error.message);
  } finally {
    await mongoose.disconnect();
    console.log('\nDisconnected from MongoDB');
  }
}

checkUsers();






