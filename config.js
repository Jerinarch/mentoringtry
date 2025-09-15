const isProduction = process.env.NODE_ENV === 'production';

const mongodbUri = process.env.MONGODB_URI || '';

if (isProduction && !mongodbUri) {
  // Fail fast in production if the DB URI is not provided
  // This prevents falling back to localhost on platforms like Render
  throw new Error('Missing MONGODB_URI in environment');
}

module.exports = {
  MONGODB_URI: mongodbUri || 'mongodb://127.0.0.1:27017/christ_mentoring',
  JWT_SECRET: process.env.JWT_SECRET || 'your_jwt_secret_key_here_change_this_in_production',
  PORT: process.env.PORT || 3000
};
