import userRoutes from './user.mjs'
// syntactic sugar for { userRoutes: userRoutes }
export { userRoutes }

import express from 'express'
import moviesRoutes from './routes/movies.mjs'
import cors from 'cors'

const app = express()

app.use(cors()) // Enable CORS for all routes

// Other middleware and configurations...

app.use('/api/movies', moviesRoutes)

// Other routes and configurations...

const port = process.env.PORT || 5050
app.listen(port, () => {
  console.log(`Server is running on port ${port}`)
})
