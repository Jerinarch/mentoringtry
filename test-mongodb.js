const mongoose = require('mongoose');
const config = require('./config');

async function testMongoDB() {
  try {
    console.log('Testing MongoDB connection...');
    console.log('MongoDB URI:', config.MONGODB_URI);
    
    await mongoose.connect(config.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    
    console.log('✅ Connected to MongoDB successfully!');
    
    // Test creating a simple document
    const testSchema = new mongoose.Schema({
      name: String,
      email: String,
      createdAt: { type: Date, default: Date.now }
    });
    
    const TestModel = mongoose.model('Test', testSchema);
    
    const testDoc = new TestModel({
      name: 'Test User',
      email: 'test@example.com'
    });
    
    await testDoc.save();
    console.log('✅ Test document saved successfully!');
    
    // Find the document
    const foundDoc = await TestModel.findOne({ email: 'test@example.com' });
    console.log('✅ Test document found:', foundDoc);
    
    // Clean up
    await TestModel.deleteOne({ email: 'test@example.com' });
    console.log('✅ Test document cleaned up!');
    
  } catch (error) {
    console.error('❌ MongoDB connection error:', error.message);
    console.error('Full error:', error);
  } finally {
    await mongoose.disconnect();
    console.log('Disconnected from MongoDB');
  }
}

testMongoDB();



