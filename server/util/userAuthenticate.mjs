import User from '../models/userModel.mjs';
import 'dotenv/config';
import jwt from 'jsonwebtoken';
import responseHandler from './handlers/responseHandlers.mjs';

const userAuthenticate = async (req, res, next) => {
    
    const token = req.cookies && req.cookies.jwt;
    
    if (!token) {
        responseHandler.unauthorize(res);
        return;
    }
    try {    
        const decoded = jwt.verify(
            token,
            process.env.ACCESS_TOKEN_KEY
        );

        const verifiedUser = await User.findById(decoded.data.id);

        if(!verifiedUser) {
            responseHandler.unauthorize(res);
        };

        req.user = verifiedUser;

        next();

    } catch (error) {
        responseHandler.unauthorize(res);
    }
};

export default userAuthenticate;