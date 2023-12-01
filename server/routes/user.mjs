import express from 'express';
import Joi from 'joi';
import User from '../models/user.mjs';
import { signUp } from '../validations/user.mjs';
import { parseError, sessionizeUser } from "../util/helpers.mjs";

const userRoutes = express.Router();

userRoutes.post("", async (req, res) => {
    try {
        const { firstname,
            lastname,
            age,
            email,
            username,
            password } = req.body

        await signUp.validateAsync({ firstname,
            lastname,
            age,
            email,
            username,
            password
        });

        const newUser = new User({  firstname,
            lastname,
            age,
            email,
            username,
            password
        });
        const sessionUser = sessionizeUser(newUser);
        await newUser.save();

        req.session.user = sessionUser;
        res.send(sessionUser);
    } catch (err) {
        res.status(400).send(parseError(err));
    }
    
});

export default userRoutes;