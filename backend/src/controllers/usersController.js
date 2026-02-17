import User from '../models/User.js';

export async function getUserAll(req, res) {
    try {
        const users = await User.find();
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ message: 'Server Error', error: error.message });
    }
};

export async function createUser(req, res) {
    try {
        const { username, password, code, prefix, firstname, lastname } = req.body;

        const newUser = new User({ username, password, code, prefix, firstname, lastname });

        await newUser.save();
        res.status(201).json(newUser);
    } catch (error) {
        res.status(500).json({ message: 'Server Error', error: error.message });
    }
};
