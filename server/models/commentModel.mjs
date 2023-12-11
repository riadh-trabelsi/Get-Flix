import mongoose from 'mongoose';

const CommentSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: trusted
    },
    content: {
        type: String,
        required: true
    },
    movie: { 
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Movie',
        required: true
    },
    timestamp: {
        type: Date,
        default: Date.now
    },
});

const Comment = mongoose.model('Comment', CommentSchema);
export default Comment;