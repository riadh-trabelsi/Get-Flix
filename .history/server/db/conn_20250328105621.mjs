import mongoose from 'mongoose'
import 'dotenv/config'


const connectionString = process.env.ATLAS_URI || ''

mongoose.connect(connectionString, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log('Connected to MongoDB')
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB', error)
  })

