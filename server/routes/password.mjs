import express  from "express";
import crypto from "crypto";
import User from '../models/user.mjs';
import { transporter, resetMailOptions } from "../util/email.mjs";

const passwordRoutes = express.Router()


passwordRoutes.post("", async (req, res) => {
    const { email } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
        return res.status(404).json({ message: 'User not found' }); // change error 404 to proper page
    }

    const token = crypto.randomBytes(20).toString('hex');

    user.resetPasswordToken = token;
    user.resetPasswordExpires = Date.now() + 3600000; // token expires in 1 hour
    await user.save({ validateBeforeSave: false });

    const resetLink = `https://getflix.com/reset-password?token=${token}`; // adjust actual page link
    const mailOptions = resetMailOptions(user.email, resetLink);
    
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.error(error);
            return res.status(500).json({ message: 'Failed to send reset email' });
        }
        console.log('Email sent: ' + info.response);
        res.json({ message: 'Reset email sent successfully' }); 
    });
});

passwordRoutes.put("", async (req, res) => {
    try {
        const { token, newPassword } = req.body; 

        const user = await User.findOneAndUpdate(
            {
                resetPasswordToken: token,
                resetPasswordExpires: {$gt: Date.now() },
            },
            {
                $set: {
                    password: newPassword,
                },
                $unset: {
                    resetPasswordToken: 1,
                    resetPasswordExpires: 1, 
                }
            },
            { new: true}
        );

        if (!user) {
            return res.status(400).json({ message: 'Invalid or expired token' });
        }

        res.json({ message: 'Password reset successfully' });
        } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Failed to process password reset request' });
        }
});

export default passwordRoutes;