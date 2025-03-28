import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import HomePage from './components/Homepage/HomePage'
import Navbar from './components/Navbar/Navbar'
import Footer from './components/Footer/Footer'
import Login from './components/Navbar/Login'
import PasswordPage from './components/PasswordPage/Password'
import ContactForm from './components/Contact/ContactForm'
import './App.css'
import Signup from './components/Navbar/Signup'
import ProfilePage from './components/Profile/Profile'
import Movies from './components/MoviesSeries/Movies'
import Series from './components/MoviesSeries/Series'
import Welcome from './components/WelcomePage/Welcome'
import Pay from './components/Navbar/Pay'
import MovieDetailPage from './components/DetailPage/DetailPage'
import TVShowDetailPage from './components/DetailPage/ShowDetailpage'
import { useEffect, useState } from 'react'
import { AuthProvider } from './context/AuthContext'

const Layout = () => {
  const location = useLocation()
  const [, setMessage] = useState<string>('')

  useEffect(() => {
    // Fetch data when the Layout component mounts
    fetch('http://localhost:5050/api/auth/check-session', {
      credentials: 'include',
    })
      .then((res) => res.json())
      .then((data) => setMessage(data.message))
  }, [])

  return (
    <>
      {location.pathname !== '/' && <Navbar />}
      <Routes>
        <Route path="homepage" element={<HomePage />} />
        <Route path="login" element={<Login />} />
        <Route path="signup" element={<Signup />} />
        <Route path="Profile" element={<ProfilePage />} />
        <Route path="password-recovery/" element={<PasswordPage />} />
        <Route path="Contact" element={<ContactForm />} />
        <Route path="movies" element={<Movies />} />
        <Route path="series" element={<Series />} />
        <Route path="pay" element={<Pay />} />
        <Route path="movie/:id" element={<MovieDetailPage />} />
        <Route path="tvshow/:id" element={<TVShowDetailPage />} />
      </Routes>
      <Footer />
    </>
  )
}

const App = () => {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Welcome />} />
          <Route path="*" element={<Layout />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  )
}

export default App
