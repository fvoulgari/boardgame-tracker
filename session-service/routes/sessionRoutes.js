const express = require('express');
const Session = require('../models/Session');
const router = express.Router();
const mongoose = require('mongoose');
const { checkExistance } = require('../lib/util'); 


router.post('/', async (req, res) => {
    const { gameId, date, players, userId } = req.body;
    try {
        const userExists = await checkExistance(userId,"http://user-service:3001/api/users/exists");

        if (!userExists) {
            return res.status(404).json({ message: 'User not found.' });
        }

        const gameExists = await checkExistance( gameId,"http://game-service:3002/api/games/exists");

        if (!gameExists) {
            return res.status(404).json({ message: 'Game not found.' });
        }

        const session = new Session({ gameId: gameId, date, players, userId });
        await session.save();
      
        res.status(201).send(session);
    } catch (error) {
        res.status(400).send(error);
    }
});

router.delete('/:sessionID', async (req, res) => {
    try {
        const sessionID = req.params.sessionID; 
        const deletedSession = await Session.findByIdAndDelete( sessionID ); 
        console.log(deletedSession)
        console.log(sessionID)
        if (!deletedSession) {
            return res.status(404).send({ message: 'Session not found' }); 
        }

        res.status(200).send({ message: 'Session successfully deleted', session: deletedSession });
    } catch (error) {
        console.log(error)
        res.status(500).send({ message: 'An error occurred', error });
    }
});

router.put('/:id', async (req, res) => {
    const { id } = req.params;  
    const { gameId, date, players } = req.body;

    try {
        const updateSession = await Session.findByIdAndUpdate(
            id,  
            { gameId, date, players },  
            { new: true }  
        );

        if (!updateSession) {
            return res.status(404).send({ message: "Session not found" });
        }

        res.send(updateSession);  
    } catch (error) {
        res.status(500).send(error);
    }
});


router.get('/game/:gameId', async (req, res) => {
    try {
        
        const gameExists = await checkExistance( gameId ,"http://game-service:3002/api/games/exists");

        if (!gameExists) {
            return res.status(404).json({ message: 'Game not found.' });
        }

        const sessions = await Session.find({ gameId: validGameId });
        res.send(sessions);
  
    } catch (error) {
        console.log(error)
        res.status(500).send(error);
    }
});




router.get('/user/:userId', async (req, res) => {
    try {

        const userExists = await checkExistance(userId,"http://user-service:3001/api/users/exists");

        if (!userExists) {
            return res.status(404).json({ message: 'User not found.' });
        }

        const sessions = await Session.find({ userId: userId });
        res.send(sessions);
  
    } catch (error) {
        console.log(error)
        res.status(500).send(error);
    }
});

router.get('/', async (req, res) => {
    try {

        const sessions = await Session.find();
        res.send(sessions);
  
    } catch (error) {
        console.log(error)
        res.status(500).send(error);
    }
});

module.exports = router;
