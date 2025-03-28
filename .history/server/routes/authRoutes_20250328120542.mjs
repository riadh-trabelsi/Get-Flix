import express from 'express'
import { login, logout } from '../controllers/authController.mjs'
import userAuthenticate from '../util/userAuthenticate.mjs'

const authRoutes = express.Router()

authRoutes.post('/login', login)
authRoutes.post('/logout', logout)
authRoutes.get('/check-session', userAuthenticate, (req, res) => {
  res.json(req.user)
})

export default authRoutes
