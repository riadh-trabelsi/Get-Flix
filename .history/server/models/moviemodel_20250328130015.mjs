import mongoose from 'mongoose'

const movieSchema = new mongoose.Schema({
  tmdb_id: {
    type: Number,
    required: true,
    unique: true,
  },
  title: String,
  overview: String,
  release_date: Date,
  poster_path: String,
  backdrop_path: String,
  vote_average: Number,
  vote_count: Number,
  popularity: Number,
  genres: [
    {
      id: Number,
      name: String,
    },
  ],
  trailerKey: String,
  lastUpdated: {
    type: Date,
    default: Date.now,
  },
  category: {
    type: String,
    enum: ['latest', 'popular', 'trending', 'upcoming'],
    required: true,
  },
  comments: [
    {
      type: mongoose.SchemaTypes.ObjectId,
      ref: 'Comment',
    },
  ],
})

// Index pour améliorer les performances des requêtes
movieSchema.index({ tmdb_id: 1 })
movieSchema.index({ category: 1 })
movieSchema.index({ lastUpdated: 1 })

const MovieModel = mongoose.model('Movie', movieSchema)

export default MovieModel
