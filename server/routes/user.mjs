import express from 'express';
import Joi from 'joi';
import User from '../models/user.mjs';
import { signUp } from '../validations/user.mjs';

const userRoutes = express.Router();

userRoutes.post("", async (req, res) => {
    try {
        const { username, email, password } = req.body
        await signUp.validateAsync({ username, email, password });

        const newUser = new User({ username, email, password });
        await newUser.save();
        res.send({ userId: newUser.id, username });
    } catch (err) {
        res.status(400).send(err);
    }
    
});

export default userRoutes;