const mongoose = require('mongoose');

const gameSchema = new mongoose.Schema({
    gameId: { type: String, required: true },
    genre: { type: String },
    playtime: { type: Number },
    players: { type: Number },
});

module.exports = mongoose.model('Game', gameSchema);
