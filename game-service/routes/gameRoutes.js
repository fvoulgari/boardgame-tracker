const express = require('express');
const Game = require('../models/Game');
const router = express.Router();

router.post('/', async (req, res) => {
    const { gameId, genre, playtime, players } = req.body;
    try {
        const game = new Game({ gameId: gameId, genre, playtime, players });
        await game.save();
        res.status(201).send(game);
    } catch (error) {
        res.status(400).send(error);
    }
});

router.get('/', async (req, res) => {
    try {
        const games = await Game.find();
        res.send(games);
    } catch (error) {
        res.status(500).send(error);
    }
});

router.get('/:gameId', async (req, res) => {
    try {
        const games = await Game.find( { gameId: parseInt(req.params.gameId)} );
        res.send(games);
    } catch (error) {
        res.status(500).send(error);
    }
});

// PUT route to update a game by gameId
router.put('/:id', async (req, res) => {
    const { id } = req.params;  // Extract gameId from route parameters
    const { gameId, genre, playtime, players } = req.body;  // Extract updated game data from request body

    try {
        // Find the game by gameId and update it with the new data
        const updatedGame = await Game.findOneAndUpdate(
            { gameId: gameId },  // Find by gameId
            { gameId, genre, playtime, players },  // Update fields
            { new: true }  // Return the updated document
        );

        if (!updatedGame) {
            return res.status(404).send({ message: "Game not found" });
        }

        res.send(updatedGame);  // Send the updated game data as a response
    } catch (error) {
        res.status(500).send(error);
    }
});


router.delete('/:gameId', async (req, res) => {
    try {
        const gameId = req.params.gameId; 
        const deletedGame = await Game.findOneAndDelete( { gameId: gameId } ); 

        if (!deletedGame) {
            return res.status(404).send({ message: 'Game not found' }); 
        }

        res.status(200).send({ message: 'Game successfully deleted', game: deletedGame });
    } catch (error) {
        res.status(500).send({ message: 'An error occurred', error });
    }
});

router.get('/exists/:id', async (req, res) => {
    try {
        const gameId = req.params.id;
        const game = await Game.find({ gameId: gameId});
        
        if (game) {
            return res.status(200).json({ exists: true, game });
        } else {
            return res.status(404).json({ exists: false });
        }
    } catch (error) {
        console.error("Error checking if game exists:", error.message);
        return res.status(500).json({ message:  error.message});
    }
});

module.exports = router;
