import mongoose from 'mongoose'

const tvShowSchema = new mongoose.Schema({
  tmdb_id: {
    type: Number,
    required: true,
    unique: true,
  },
  name: String,
  overview: String,
  first_air_date: Date,
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
    enum: ['trending', 'popular', 'toprated', 'ontheair'],
    required: true,
  },
  episodes: [
    {
      seasonNumber: Number,
      episodeNumber: Number,
      name: String,
      airDate: Date,
      overview: String,
    },
  ],
  comments: [
    {
      type: mongoose.SchemaTypes.ObjectId,
      ref: 'Comment',
    },
  ],
})

// Index pour améliorer les performances des requêtes
tvShowSchema.index({ tmdb_id: 1 })
tvShowSchema.index({ category: 1 })
tvShowSchema.index({ lastUpdated: 1 })

const TvShowModel = mongoose.model('TvShow', tvShowSchema)

export default TvShowModel
