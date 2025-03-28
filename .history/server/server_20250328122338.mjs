import express from 'express'
import cors from 'cors'
import 'dotenv/config'
import mongoose from 'mongoose'
import cookieParser from 'cookie-parser'
import {
  userRoutes,
  passwordRoutes,
  movieRoutes,
  homepageRoutes,
  tvShowsRoutes,
  authRoutes,
  commentRoutes,
  contactRoutes,
} from './routes/index.mjs'

const PORT = process.env.PORT || 5050
const NODE_ENV = process.env.NODE_ENV || 'development'
const app = express()

app.use(cookieParser())
app.use(
  cors({
    origin: ['http://localhost:5173', 'https://viewtopiafront.onrender.com'],
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true,
  }),
)
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

// Connexion à MongoDB
const connectionString = process.env.ATLAS_URI || ''
mongoose
  .connect(connectionString, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log('Connected to MongoDB')
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB:', error)
  })

// Montage de toutes les routes sous /api
app.use('/api/movies', movieRoutes)
app.use('/api/homepage', homepageRoutes)
app.use('/api/tvshows', tvShowsRoutes)
app.use('/api/users', userRoutes)
app.use('/api/password', passwordRoutes)
app.use('/api/auth', authRoutes)
app.use('/api/comment', commentRoutes)
app.use('/api/contact', contactRoutes)

// start the Express server
app.listen(PORT, () => {
  console.log(`Server is running on port: ${PORT}`)
})
