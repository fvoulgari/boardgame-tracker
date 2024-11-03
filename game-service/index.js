const appInsights = require('applicationinsights');

const INSIGHT_KEY = process.env.INSIGHT_KEY;

// Use either the instrumentation key or connection string
appInsights.setup(INSIGHT_KEY)
  .setAutoCollectRequests(true)    // Enable request tracking
  .setAutoCollectDependencies(true) // Enable dependency tracking
  .setAutoCollectExceptions(true)   // Enable error tracking
  .setAutoCollectPerformance(true)  // Enable performance tracking
  .setAutoCollectConsole(true, true) // Collect console.log and console.error
  .start();                         // Starts the Application Insights SDK


const express = require('express');
const mongoose = require('mongoose');
const gameRoutes = require('./routes/gameRoutes');
const cors = require('cors'); // Import the cors package

require('dotenv').config();

const app = express();
app.use(express.json());
app.use(cors());
  
const MONGO_URI = process.env.MONGO_URI;

mongoose.connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Game Service connected to MongoDB'))
    .catch(err => console.error('MongoDB connection error:', err));

app.use('/api/games', gameRoutes);


const PORT = process.env.PORT || 3002;
app.listen(PORT, () => console.log(`Game Service running on port ${PORT}`));