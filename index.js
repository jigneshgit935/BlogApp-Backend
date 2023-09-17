const express = require('express');
const app = express();

const bodyparser = require('body-parser');
const cors = require('cors');

const PORT = 8000;
const authRoutes = require('./Routes/Auth');
const blogRoutes = require('./Routes/Blog');
const imageUploadRoutes = require('./Routes/imageUploadRoutes');

require('dotenv').config();
require('./db');
const User = require('./Models/UserSchema');
const cookieParser = require('cookie-parser');

app.use(bodyparser.json());

const allowedOrigins = ['http://localhost:3000'];

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error('Not allowed by CORS'));
      }
    },
    credentials: true,
  })
);

app.use(cookieParser());

app.use('/auth', authRoutes);
app.use('/blog', blogRoutes);
app.use('/image', imageUploadRoutes);

app.get('/blogCategories', async (req, res) => {
  const blogCategories = [
    'Technology Trends',
    'Health and Wellness',
    'Travel Destination',
    'Food and Cooking',
    'Personal Finance',
    'Career Development',
    'Parenting Tips',
    'Self-Improvement',
    'Home and Decor and DIY',
    'Book Reviews',
    'Enviromental Sustainablity',
    'Fitness and Exercise',
    'Movie and TV Show Reviews',
    'Entrepreneurship',
    'Mental Health',
    'Fashion and Style',
    'Hobby and Crafts',
    'Pet Care',
    'Education and Learning',
    'Sports and Recreation',
  ];
  res.json({
    message: 'Categories fetched successfully',
    categories: blogCategories,
  });
});

app.listen(PORT, () => {
  console.log(`Server started at port ${PORT} `);
});
