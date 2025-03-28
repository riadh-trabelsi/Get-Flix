import User from '../models/userModel.mjs'
import { signUpValidation, infoUpdateValidation } from '../validations/userValidation.mjs'
import { createAccessToken } from '../util/secretToken.mjs';
import  responseHandler  from '../util/handlers/responseHandlers.mjs'
import { parseError } from '../util/helpers.mjs';

const signup = async (req, res) => {
    try {
        const { firstname, lastname, email, password } = req.body;

        // Validation
        try {
            await signUpValidation.validateAsync({firstname, lastname, email, password });
        } catch (validationError) {
            return res.status(400).json({
                message: validationError.details[0].message,
                error: 'Validation error'
            });
        }

        // Vérifier si l'email existe déjà
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({
                message: 'Email already exists',
                error: 'Duplicate email'
            });
        }

        const newUser = new User({ firstname, lastname, email, password, role: 'registrant' });
       
        await newUser.save();

        const accessToken = createAccessToken(newUser);

        res.cookie('jwt', accessToken, {
            //sameSite: "None",
            withCredentials: true,
            httpOnly: true, //for dev purposes change to true for prod
            maxAge: 2 * 60 * 60 * 1000 //cookie expiry: set to match aT (2Hours)
        });

        return res.status(201).json({
            success: true,
            message: 'User created successfully',
            user: {
                id: newUser._id,
                firstname: newUser.firstname,
                lastname: newUser.lastname,
                email: newUser.email
            }
        });

    } catch (err) {
        console.error('Signup error:', err);
        return res.status(500).json({
            message: 'Internal server error',
            error: err.message
        });
    }
};

const updateUserInfo = async (req, res) => {
    try{
        const { firstname, lastname, email, password } = req.body;

        await infoUpdateValidation.validateAsync({ firstname, lastname, email, password });

        const user = await User.findById(req.user.id);

        if (!user) {
            return responseHandler.notFound(res);
        };

        const duplicate = await User.findOne({ email }).lean();

        if (duplicate && duplicate?._id.toString() !== req.user.id) {
            return responseHandler.duplicate(res, email, duplicate);
        };

        user.firstname = firstname;
        user.lastname = lastname;
        user.email = email;
        user.password = password;

        await user.save();

        responseHandler.ok(res);

    } catch (err) {
        responseHandler.valError(res, parseError);
    }
    
}

const getUserInfo = (req,res) => {
    const user = req.user;
    if (!user){
        responseHandler.notFound(res);
    }
    responseHandler.ok(res, {
        ...user._doc,
    });
};

const deactivateAccount = async (req, res) => {
    try{
        const userId = req.user.id;

        const updateResult = await User.updateOne(
            { _id: userId },
            {
                $set: {
                    isActive: false,
                },
            }
        );

        if (updateResult.nModified >= 1) {
            return responseHandler.ok(res);
        } else {
            return responseHandler.notFound(res);
        }
    } catch (err) {
        responseHandler.error(res);
    }
};

export {
    signup,
    getUserInfo,
    updateUserInfo,
    deactivateAccount
}