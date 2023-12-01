import express from 'express';
import Joi from 'joi';
import User from '../models/user.mjs';
import { signUp } from '../validations/user.mjs';
import { parseError, sessionizeUser } from "../util/helpers.mjs";

const userRoutes = express.Router();

userRoutes.post("", async (req, res) => {
    try {
        const { username, email, password } = req.body
        await signUp.validateAsync({ username, email, password });

        const newUser = new User({ username, email, password });
        const sessionUser = sessionizeUser(newUser);
        await newUser.save();
        console.log(req.session)

        req.session.user = sessionUser;
        res.send(sessionUser);
    } catch (err) {
        res.status(400).send(parseError(err));
    }
    
});

export default userRoutes;