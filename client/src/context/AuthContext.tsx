import React, { createContext, useState, useContext, useEffect } from 'react'

interface User {
  firstname: string
  lastname: string
  email: string
}

interface AuthContextType {
  isAuthenticated: boolean
  user: User | null
  login: (userData: User) => void
  logout: () => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [user, setUser] = useState<User | null>(null)

  useEffect(() => {
    // Vérifier l'état de la session au chargement
    checkSession()
  }, [])

  const checkSession = async () => {
    try {
      const response = await fetch(
        'http://localhost:5050/api/auth/check-session',
        {
          credentials: 'include',
        },
      )
      const data = await response.json()

      if (data.isAuthenticated && data.user) {
        setUser(data.user)
        setIsAuthenticated(true)
      } else {
        setUser(null)
        setIsAuthenticated(false)
      }
    } catch (error) {
      console.error('Error checking session:', error)
      setUser(null)
      setIsAuthenticated(false)
    }
  }

  const login = (userData: User) => {
    setUser(userData)
    setIsAuthenticated(true)
  }

  const logout = async () => {
    try {
      await fetch('http://localhost:5050/api/auth/logout', {
        method: 'POST',
        credentials: 'include',
      })
      setUser(null)
      setIsAuthenticated(false)
    } catch (error) {
      console.error('Error logging out:', error)
    }
  }

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}
