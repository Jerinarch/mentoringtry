const mongoose = require('mongoose');
const User = require('./models/User');
const config = require('./config');

async function updateUsers() {
  try {
    console.log('Connecting to MongoDB...');
    await mongoose.connect(config.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    
    console.log('✅ Connected to MongoDB!');
    console.log('Updating user data...\n');
    
    // Update all users with new values
    const updateResult = await User.updateMany(
      {}, // Update all users
      {
        $set: {
          totalCredits: 140,
          skills: {
            communication: 85,
            problemSolving: 78,
            teamwork: 92
          }
        }
      }
    );
    
    console.log(`Updated ${updateResult.modifiedCount} users with new data`);
    
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
      console.log(`  Skills:`);
      console.log(`    Communication: ${user.skills.communication}%`);
      console.log(`    Problem Solving: ${user.skills.problemSolving}%`);
      console.log(`    Teamwork: ${user.skills.teamwork}%`);
    });
    
  } catch (error) {
    console.error('❌ Error:', error.message);
  } finally {
    await mongoose.disconnect();
    console.log('\nDisconnected from MongoDB');
  }
}

updateUsers();

