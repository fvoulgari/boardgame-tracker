const express = require('express');
const mongoose = require('mongoose');
const sessionRoutes = require('./routes/sessionRoutes');
require('dotenv').config();
const cors = require('cors'); // Import the cors package


const app = express();
app.use(express.json());
app.use(cors());

const MONGO_URI = process.env.MONGO_URI;

mongoose.connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Session Service connected to MongoDB'))
    .catch(err => console.error('MongoDB connection error:', err));

app.use('/api/sessions', sessionRoutes);

const PORT = process.env.PORT || 3003;
app.listen(PORT, () => console.log(`Session Service running on port ${PORT}`));
