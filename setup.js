const mongoose = require('mongoose');
const User = require('./models/User');
const config = require('./config');

async function setupDatabase() {
  try {
    // Connect to MongoDB
    await mongoose.connect(config.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('Connected to MongoDB');

    // Create sample users
    const sampleUsers = [
      {
        email: 'john.doe@christuniversity.in',
        password: 'password123',
        name: 'John Doe',
        program: 'Computer Science',
        studentId: 'BTCS2024001',
        attendance: 95,
        gpa: 3.8,
        totalCredits: 140,
        skills: {
          communication: 85,
          problemSolving: 78,
          teamwork: 92
        }
      },
      {
        email: 'jane.smith@christuniversity.in',
        password: 'password123',
        name: 'Jane Smith',
        program: 'Information Technology',
        studentId: 'BTIT2024002',
        attendance: 88,
        gpa: 3.6,
        totalCredits: 140,
        skills: {
          communication: 82,
          problemSolving: 75,
          teamwork: 88
        }
      }
    ];

    // Clear existing users
    await User.deleteMany({});
    console.log('Cleared existing users');

    // Create sample users
    for (const userData of sampleUsers) {
      const user = new User(userData);
      await user.save();
      console.log(`Created user: ${user.email}`);
    }

    console.log('Database setup completed successfully!');
    console.log('\nSample login credentials:');
    console.log('Email: john.doe@christuniversity.in');
    console.log('Password: password123');
    console.log('\nEmail: jane.smith@christuniversity.in');
    console.log('Password: password123');

  } catch (error) {
    console.error('Setup error:', error);
  } finally {
    await mongoose.disconnect();
    console.log('Disconnected from MongoDB');
  }
}

setupDatabase();
