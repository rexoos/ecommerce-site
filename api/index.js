// api/index.js
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const serverless = require('serverless-http');
require('dotenv').config();

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Connect to MongoDB
// Note: In serverless functions, you might want to add logic to cache/ensure you don’t create a new connection on every invocation.
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log('MongoDB connection error:', err));

// Routes
// Adjust the path if needed based on your project structure.
// For example, if your routes are in server/routes/auth.js:
const authRoutes = require('../server/routes/auth');
app.use('/api/auth', authRoutes);

app.get('/', (req, res) => {
  res.send('E-commerce API running');
});

// Instead of calling app.listen, export the app wrapped in serverless-http:
module.exports = serverless(app);
