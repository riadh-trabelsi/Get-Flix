import express from 'express';
import { generateUniqueId } from '../util/idGenerator.mjs';

const visitorRoutes = express.Router();

visitorRoutes.get("", (req, res) => {
    try {
        const sessionId = generateUniqueId();

        req.session.visitorId = sessionId;

        req.session.user= {
            role: 'visitor',
        };

        res.send('New visitor created!');
    } catch (error) { 
        console.error('Error creating new visitor:', error);
        res.status(500).send('Internal Server Error');
    }
});


export default visitorRoutes;