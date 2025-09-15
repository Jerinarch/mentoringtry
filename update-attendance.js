const mongoose = require('mongoose');
const User = require('./models/User');
const config = require('./config');

async function updateAttendance() {
  try {
    console.log('Connecting to MongoDB...');
    await mongoose.connect(config.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    
    console.log('✅ Connected to MongoDB!');
    console.log('Updating attendance to 85%...\n');
    
    // Update all users with 85% attendance
    const updateResult = await User.updateMany(
      {}, // Update all users
      {
        $set: {
          attendance: 85
        }
      }
    );
    
    console.log(`Updated ${updateResult.modifiedCount} users with 85% attendance`);
    
    // Show updated users
    const users = await User.find({}).select('-password');
    console.log('\nUpdated users:');
    users.forEach((user, index) => {
      console.log(`\nUser ${index + 1}:`);
      console.log(`  Name: ${user.name}`);
      console.log(`  Email: ${user.email}`);
      console.log(`  Attendance: ${user.attendance}%`);
      console.log(`  GPA: ${user.gpa}`);
      console.log(`  Credits: ${user.totalCredits}`);
    });
    
  } catch (error) {
    console.error('❌ Error:', error.message);
  } finally {
    await mongoose.disconnect();
    console.log('\nDisconnected from MongoDB');
  }
}

updateAttendance();

