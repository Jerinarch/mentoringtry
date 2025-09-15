const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path');
const config = require('./config');

// Import routes
const { router: authRoutes } = require('./routes/auth');
const meetingRoutes = require('./routes/meetings');
const feedbackRoutes = require('./routes/feedback');
const studentRoutes = require('./routes/student');

const app = express();
const PORT = config.PORT;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Serve static files (HTML, CSS, JS)
app.use(express.static(__dirname));

// MongoDB connection
mongoose.connect(config.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('Connected to MongoDB'))
.catch(err => console.error('MongoDB connection error:', err));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/meetings', meetingRoutes);
app.use('/api/feedback', feedbackRoutes);
app.use('/api/student', studentRoutes);

// Serve HTML pages
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'mentoringlogin.html'));
});

app.get('/login', (req, res) => {
  res.sendFile(path.join(__dirname, 'mentoringlogin.html'));
});

app.get('/register', (req, res) => {
  res.sendFile(path.join(__dirname, 'mentoringregister.html'));
});

app.get('/home', (req, res) => {
  res.sendFile(path.join(__dirname, 'mentoringhomepage.html'));
});

app.get('/profile', (req, res) => {
  res.sendFile(path.join(__dirname, 'mentoringdashboard.html'));
});

app.get('/meetings', (req, res) => {
  res.sendFile(path.join(__dirname, 'mentoringschedule.html'));
});

app.get('/feedback', (req, res) => {
  res.sendFile(path.join(__dirname, 'mentoringfeedback.html'));
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Something went wrong!', error: err.message });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ message: 'Route not found' });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
