const mongoose = require('mongoose');

const sessionSchema = new mongoose.Schema({
    gameId: { type: String, required: true },
    date: { type: Date, required: true },
    players: [{ type: String, required: true }], 
    userId: { type: String, required: true, unique: true },
});

module.exports = mongoose.model('Session', sessionSchema);
