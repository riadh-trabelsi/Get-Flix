import express from 'express';
import checkUserRole from '../util/helpers.mjs';
import Joi from 'joi';
import commentValidation from '../validations/comment.mjs'
import sanitize from 'sanitize-html';
import Movie from '../models/Movie.mjs';

const commentRoutes = express.Router();

commentRoutes.post('/addComment', checkUserRole('registrant'), async (req, res) => {
    try{
        
        const { error, value } = req.body
        await commentValidation.validate(req.body);

        if (error) {
            return res.status(400).send(error.details[0].message);
        }

        const { commentText } = value;
        const { movieId } = req.body;

        const sanitizedText = sanitize(commentText);

        const movie = await Movie.findById(movieId);

        if (!movie) {
            return res.status(404).send('Movie not found')
        }

        const newComment = new Comment({
            text: sanitizedText,
            userId: req.session.user._id,
            date: new Date(),
            movieId: movieId
            // Add other comment details as needed
        });

        movie.comments.push(newComment);

        await movie.save();

        res.send('Comment added successfully');
    } catch (error) {
        console.error('Error adding comment:', error);
        res.status(500).send('Internal Server Error');
    }
});

//export default commentRoutes;