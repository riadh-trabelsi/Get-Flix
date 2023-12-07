import express from 'express'
import { signUp, login } from '../controllers/userController.mjs'
import { userVerification } from '../util/userAuthMiddleware.mjs'

const userRoutes = express.Router()

userRoutes.post('/signup', signUp)
userRoutes.post('/login', login)
userRoutes.post('/', userVerification)

userRoutes.get('', async (req, res) => {
  try {
    const userId = req.session.user.userId

    const user = await User.findById(userId)

    if (user) {
      res.send({ user })
    } else {
      throw new Error('User not found')
    }
  } catch (err) {
    res.status(500).send(err.message)
  }
})

export default userRoutes
