import { commentValidation } from "../validations/commentValidation.mjs";
import Comment from "../models/commentModel.mjs";
import { parseError } from "../util/helpers.mjs";
import sanitize from 'sanitize-html';

export const submitComment = async (req, res) => {
    try {
        const {
            text,
            user_id,

        } = req.body;

        await commentValidation.validateAsync({
            text,
        });

        const newComment = new Comment({
            text,
            user_id,
        });

        

        res.send(newComment);
    } catch (error){ 
        res.status(400).send(parseError(err));
    };
}; 

export const deleteComment = async (req, res) => {
    try {
        const commentId = req.params.id;

        const deletedComment = await Comment.findByIdAndDelete(commentId);

        if (!deletedComment) {
            return res.status(404).json({ error: 'Comment not found' });
        }

        res.status(200).json({ message: 'Comment deleted successfully' });   
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });    };
}