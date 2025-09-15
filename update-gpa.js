const mongoose = require('mongoose');
const User = require('./models/User');
const config = require('./config');

async function updateGPA() {
  try {
    console.log('Connecting to MongoDB...');
    await mongoose.connect(config.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    
    console.log('✅ Connected to MongoDB!');
    console.log('Updating GPA values...\n');
    
    // Update users with different GPA values
    const users = await User.find({});
    
    for (let i = 0; i < users.length; i++) {
      const user = users[i];
      let gpaValue;
      
      // Assign different GPA values based on user
      if (user.email === 'john.doe@christuniversity.in') {
        gpaValue = 3.8;
      } else if (user.email === 'jane.smith@christuniversity.in') {
        gpaValue = 3.6;
      } else if (user.email === 'jerinphilipjr7@gmail.com') {
        gpaValue = 3.4;
      } else {
        gpaValue = 3.2;
      }
      
      await User.updateOne(
        { _id: user._id },
        { $set: { gpa: gpaValue } }
      );
      
      console.log(`Updated ${user.name}: GPA = ${gpaValue}`);
    }
    
    // Show updated users
    const updatedUsers = await User.find({}).select('-password');
    console.log('\nUpdated users:');
    updatedUsers.forEach((user, index) => {
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

updateGPA();


