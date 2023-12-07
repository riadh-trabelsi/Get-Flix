import 'dotenv/config'
import jwt from "jsonwebtoken";

export const createSecretToken = ({_id}) =>
jwt.sign(
    { _id },
     process.env.TOKEN_KEY, 
    {expiresIn: "2h"},
    );
