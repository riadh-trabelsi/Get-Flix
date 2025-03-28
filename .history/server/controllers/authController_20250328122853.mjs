import User from '../models/userModel.mjs'
import { signInValidation } from '../validations/userValidation.mjs'
import { createAccessToken } from '../util/secretToken.mjs'

const login = async (req, res) => {
  try {
    const { email, password } = req.body

    // Validation
    try {
      await signInValidation.validateAsync({ email, password })
    } catch (validationError) {
      return res.status(400).json({
        message: validationError.details[0].message,
        error: 'Validation error',
      })
    }

    const user = await User.findOne({ email })

    if (!user) {
      return res.status(401).json({
        message: 'Invalid email or password',
        error: 'Authentication failed',
      })
    }

    const isValidPassword = user.comparePasswords(password)
    if (!isValidPassword) {
      return res.status(401).json({
        message: 'Invalid email or password',
        error: 'Authentication failed',
      })
    }

    const accessToken = createAccessToken(user)

    res.cookie('jwt', accessToken, {
      withCredentials: true,
      httpOnly: true,
      maxAge: 2 * 60 * 60 * 1000,
    })

    return res.status(200).json({
      success: true,
      message: 'Login successful',
      user: {
        id: user._id,
        firstname: user.firstname,
        lastname: user.lastname,
        email: user.email,
      },
    })
  } catch (err) {
    console.error('Login error:', err)
    return res.status(500).json({
      message: 'Internal server error',
      error: err.message,
    })
  }
}

const logout = (req, res) => {
  try {
    const cookies = req.cookies

    if (!cookies?.jwt) {
      return res.status(204).json({ message: 'No cookie to clear' })
    }

    res.clearCookie('jwt', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
    })

    res.status(200).json({ message: 'Logged out successfully' })
  } catch (err) {
    console.error('Logout error:', err)
    return res.status(500).json({
      message: 'Internal server error',
      error: err.message,
    })
  }
}

export { login, logout }
