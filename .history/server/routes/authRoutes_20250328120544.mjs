import express from 'express'
import { login, logout } from '../controllers/authController.mjs'
import jwt from 'jsonwebtoken'
import User from '../models/user.mjs'

const authRoutes = express.Router()

authRoutes.post('/login', login)
authRoutes.post('/logout', logout)
authRoutes.get('/check-session', async (req, res) => {
  try {
    const token = req.cookies && req.cookies.jwt

    if (!token) {
      return res.status(200).json({ isAuthenticated: false })
    }

    const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_KEY)
    if (!decodedToken) {
      return res.status(200).json({ isAuthenticated: false })
    }

    const verifiedUser = await User.findById(decodedToken.data.id)
    if (!verifiedUser) {
      return res.status(200).json({ isAuthenticated: false })
    }

    res.json({
      isAuthenticated: true,
      user: verifiedUser,
    })
  } catch (error) {
    res.status(200).json({ isAuthenticated: false })
  }
})

export default authRoutes
