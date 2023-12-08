import User from '../models/userModel.mjs'
import { signUpValidation } from '../validations/userValidation.mjs'
import { createAccessToken } from '../util/secretToken.mjs';
import  responseHandler  from '../util/handlers/responseHandlers.mjs'

const signup = async (req, res) => {
    try {
        const { firstname, lastname, email, password } = req.body;

        await signUpValidation.validateAsync({firstname, lastname, email, password });

        const newUser = new User({ firstname, lastname, email, password, role: 'registrant' });
       
        await newUser.save();

        const accessToken = createAccessToken(newUser);

        res.cookie('jwt', accessToken, {
            sameSite: "None",
            withCredentials: true,
            httpOnly: false, //for dev purposes change to true for prod
            maxAge: 2 * 60 * 60 * 1000 //cookie expiry: set to match aT (2Hours)
        });

        responseHandler.created(res, {
            accessToken,
            ...newUser._doc,
            id: newUser.id
        });

    } catch {
        responseHandler.error(res);
        //res.status(400).send(parseError(err)); dev purposes
    };
};

const getUserInfo = (req,res) => {
    const user = req.user;
    if (!user){
        responseHandler.notFound(res);
    }
    responseHandler.ok(res, {
        ...user._doc,
    });
};

export {
    signup,
    getUserInfo
}