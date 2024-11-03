const express = require('express');
const User = require('../models/User');
const router = express.Router();

router.post('/register', async (req, res) => {
    const { username, email } = req.body;
    try {
        const user = new User({ username, email });
        await user.save();
        res.status(201).send(user);
    } catch (error) {
        res.status(400).send(error);
    }
});

router.get('/exists/:id', async (req, res) => {
    try {
        const userId = req.params.id;
        const user = await User.findById(userId);
        
        if (user) {
            return res.status(200).json({ exists: true, user });
        } else {
            return res.status(404).json({ exists: false });
        }
    } catch (error) {
        console.error("Error checking if user exists:", error.message);
        return res.status(500).json({ message: 'Internal Server Error' });
    }
});

router.get('/:id', async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) return res.status(404).send('User not found');
        res.send(user);
    } catch (error) {
        res.status(500).send(error);
    }
});

router.get('/', async (req, res) => {
    try {
        const user = await User.find();
        if (!user) return res.status(404).send('User not found');
        res.send(user);
    } catch (error) {
        res.status(500).send(error);
    }
});

router.delete('/:id', async (req, res) => {
    try {
        const user = await User.findByIdAndDelete(req.params.id);
        if (!user) return res.status(404).send('User not found');
        res.send(user);
    } catch (error) {
        res.status(500).send(error);
    }
});

router.put('/:id', async (req, res) => {
    const { id } = req.params;  // Extract gameId from route parameters
    const { username, email } = req.body;

    try {
        // Find the game by gameId and update it with the new data
        const updateUser = await User.findByIdAndUpdate(
            id,  // Find by gameId
            { username, email },  // Update fields
            { new: true }  // Return the updated document
        );

        if (!updateUser) {
            return res.status(404).send({ message: "User not found" });
        }

        res.send(updateUser);  // Send the updated game data as a response
    } catch (error) {
        res.status(500).send(error);
    }
});

module.exports = router;
