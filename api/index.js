const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const config = require('../config');

const { router: authRoutes } = require('../routes/auth');
const meetingRoutes = require('../routes/meetings');
const feedbackRoutes = require('../routes/feedback');
const studentRoutes = require('../routes/student');

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

let isConnected = false;
async function connectToDatabase() {
  if (isConnected) return;

  console.log('Attempting MongoDB connection (serverless)...');
  console.log('MongoDB URI present:', Boolean(config.MONGODB_URI));

  mongoose.connection.on('error', (err) => console.error('Mongoose error:', err));
  mongoose.connection.on('connected', () => console.log('Mongoose connected'));
  mongoose.connection.on('disconnected', () => console.warn('Mongoose disconnected'));

  await mongoose.connect(config.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    serverSelectionTimeoutMS: 10000,
    socketTimeoutMS: 20000,
  });
  isConnected = true;
}

app.use(async (req, res, next) => {
  try {
    await connectToDatabase();
    next();
  } catch (err) {
    console.error('MongoDB connection error:', err);
    res.status(500).json({ message: 'Database connection error' });
  }
});

// Mount without /api because Vercel prefixes it
app.use('/auth', authRoutes);
app.use('/meetings', meetingRoutes);
app.use('/feedback', feedbackRoutes);
app.use('/student', studentRoutes);

module.exports = app;


