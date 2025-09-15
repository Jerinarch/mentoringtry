# Christ Mentoring App - Backend Integration

This is a complete backend integration for the Christ Mentoring web application, connecting the HTML frontend with MongoDB database.

## Features

- **User Authentication**: Login with email and password, JWT token-based authentication
- **Student Profile Management**: View and update student information, attendance, GPA, and skills
- **Meeting Management**: Add, reschedule, delete meetings with mentors
- **Feedback System**: Submit feedback about mentors with ratings
- **Real-time Data**: All data is stored in MongoDB and synchronized across the application

## Prerequisites

- Node.js (v14 or higher)
- MongoDB (running on localhost:27017)
- npm or yarn package manager

## Installation & Setup

1. **Install Dependencies**
   ```bash
   npm install
   ```

2. **Start MongoDB**
   Make sure MongoDB is running on your local machine:
   ```bash
   # On Windows
   net start MongoDB
   
   # On macOS/Linux
   sudo systemctl start mongod
   ```

3. **Setup Database with Sample Data**
   ```bash
   node setup.js
   ```
   This will create sample users and clear any existing data.

4. **Start the Server**
   ```bash
   npm start
   ```
   Or for development with auto-restart:
   ```bash
   npm run dev
   ```

5. **Access the Application**
   Open your browser and go to: `http://localhost:3000`

## Sample Login Credentials

After running the setup script, you can use these credentials to test the application:

- **Email**: john.doe@christuniversity.in
- **Password**: password123

- **Email**: jane.smith@christuniversity.in  
- **Password**: password123

## API Endpoints

### Authentication
- `POST /api/auth/login` - User login
- `POST /api/auth/register` - User registration
- `GET /api/auth/profile` - Get current user profile

### Student Management
- `GET /api/student/profile` - Get student profile and stats
- `PUT /api/student/profile` - Update student profile
- `GET /api/student/dashboard` - Get dashboard data
- `GET /api/student/progress` - Get progress metrics

### Meetings
- `GET /api/meetings` - Get all meetings for student
- `POST /api/meetings` - Create new meeting
- `PUT /api/meetings/:id` - Update/reschedule meeting
- `DELETE /api/meetings/:id` - Delete meeting
- `GET /api/meetings/upcoming` - Get upcoming meetings

### Feedback
- `POST /api/feedback` - Submit feedback
- `GET /api/feedback` - Get all feedback by student
- `PUT /api/feedback/:id` - Update feedback
- `DELETE /api/feedback/:id` - Delete feedback

## Database Schema

### User Collection
- email, password, name, program, studentId
- attendance, gpa, totalCredits
- skills: {communication, problemSolving, teamwork}
- timestamps

### Meeting Collection
- studentId, mentorName, topic
- scheduledDate, scheduledTime, duration
- status, location, notes
- timestamps

### Feedback Collection
- studentId, mentorName, program
- ratings: {expertise, communication, supportiveness, overallSatisfaction}
- suggestions, isAnonymous
- timestamps

## Frontend Integration

The HTML pages have been updated to:
- Authenticate users with JWT tokens
- Load real data from the backend APIs
- Handle CRUD operations for meetings and feedback
- Display dynamic content based on user data
- Maintain session state across page navigation

## Security Features

- Password hashing with bcrypt
- JWT token authentication
- CORS enabled for cross-origin requests
- Input validation and sanitization
- Protected routes requiring authentication

## Development

To modify the application:

1. **Backend Changes**: Edit files in `/routes`, `/models`, or `server.js`
2. **Frontend Changes**: Edit the HTML files and their JavaScript
3. **Database Changes**: Modify schemas in `/models` directory

## Troubleshooting

1. **MongoDB Connection Issues**: Ensure MongoDB is running and accessible
2. **Port Conflicts**: Change the PORT in `config.js` if 3000 is occupied
3. **Authentication Errors**: Check JWT secret in `config.js`
4. **CORS Issues**: Verify CORS settings in `server.js`

## File Structure

```
IWP_PROJECT_FILES/
├── models/                 # MongoDB schemas
│   ├── User.js
│   ├── Meeting.js
│   └── Feedback.js
├── routes/                 # API routes
│   ├── auth.js
│   ├── meetings.js
│   ├── feedback.js
│   └── student.js
├── mentoringlogin.html     # Login page
├── mentoringhomepage.html  # Home page
├── mentoringdashboard.html # Profile page
├── mentoringschedule.html  # Meetings page
├── mentoringfeedback.html  # Feedback page
├── server.js              # Main server file
├── config.js              # Configuration
├── setup.js               # Database setup script
└── package.json           # Dependencies
```

## Support

For issues or questions, check the console logs for error messages and ensure all dependencies are properly installed.
