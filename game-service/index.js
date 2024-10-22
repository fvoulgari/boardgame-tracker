const express = require('express');
const mongoose = require('mongoose');
const gameRoutes = require('./routes/gameRoutes');
require('dotenv').config();

const app = express();
app.use(express.json());

const MONGO_URI = process.env.MONGO_URI;

mongoose.connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Game Service connected to MongoDB'))
    .catch(err => console.error('MongoDB connection error:', err));

app.use('/api/games', gameRoutes);

const PORT = process.env.PORT || 3002;
app.listen(PORT, () => console.log(`Game Service running on port ${PORT}`));