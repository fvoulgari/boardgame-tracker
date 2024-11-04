const appInsights = require('applicationinsights');

const INSIGHT_KEY = process.env.INSIGHT_KEY;
console.log(INSIGHT_KEY, "This is the insight key")
appInsights.setup(INSIGHT_KEY)
  .setAutoCollectRequests(true)    
  .setAutoCollectDependencies(true) 
  .setAutoCollectExceptions(true)   
  .setAutoCollectPerformance(true)  
  .setAutoCollectConsole(true, true)
  .start();                         


const express = require('express');
const mongoose = require('mongoose');
const gameRoutes = require('./routes/gameRoutes');
const cors = require('cors'); 

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