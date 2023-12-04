import userRoutes from './user.mjs'
import express from 'express'
import movieRoutes from './movie.mjs'
import cors from 'cors'


const app = express()

app.use(cors()) // Enable CORS for all routes

// Other middleware and configurations...

app.use('/api/movies', movieRoutes)

// Other routes and configurations...

const port = process.env.PORT || 5050
app.listen(port, () => {
  console.log(`Server is running on port ${port}`)
})
export { userRoutes, movieRoutes }
