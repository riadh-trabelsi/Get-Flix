import mongoose from 'mongoose';

const CommentSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true
    },
    text: {
        type: String,
        required: true
    },
    movieId: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        required: true
    },
})

const Comment = mongoose.model('Comment', CommentSchema);
export default Comment;