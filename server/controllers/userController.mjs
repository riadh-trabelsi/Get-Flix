import User from '../models/userModel.mjs'
import { signInValidation, signUpValidation } from '../validations/userValidation.mjs'
import { parseError } from '../util/helpers.mjs'
import { createSecretToken } from '../util/secretToken.mjs';

export const signUp = async (req, res) => {
    try {
        const {
        firstname,
        lastname,
        // age,
        email,
        // username,
        password,
        } = req.body;

        await signUpValidation.validateAsync({
        firstname,
        lastname,
        // age,
        email,
        // username,
        password,
        });

        const newUser = new User({
        firstname,
        lastname,
        // age,
        email,
        // username,
        password,
        });
       
        await newUser.save();

        res.send(newUser);
    } catch (err) {
        res.status(400).send(parseError(err));
    };
};

export const login = async (req, res) => {
    try{
        const {
            email,
            password,
        } = req.body;

        await signInValidation.validateAsync({
            email,
            password,
        }) ;
        
        const user = await User.findOne({ email });
        if (user && user.comparePasswords(password)) {
            const token = createSecretToken(user._id);
            res.cookie("token", token, {
                withCredentials: true,
                httpOnly: false,
            });
            res.status(201).json({ message: "User logged in successfully", success: true });
          
        } else {
            throw new Error('Invalid login credentials');
        }
    } catch (err) { 
        res.status(401).send(parseError(err));
    };
};