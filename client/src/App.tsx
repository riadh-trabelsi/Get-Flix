import HomePage from './components/Homepage/HomePage'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
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

const App = () => {
  return (
    <>
      <BrowserRouter> 
        <Routes>
          <Route path="/" element={<Welcome />} />
          <Route
            path="(.*)"
            element={
              <>
                <Navbar />
                <Routes>
                  <Route path="homepage" element={<HomePage />} />
                  <Route path="login" element={<Login />} />
                  <Route path="signup" element={<Signup />} />
                  <Route path="Profile" element={<ProfilePage />} />
                  <Route path="password-recovery/" element={<PasswordPage />} />
                  <Route path="Contact" element={<ContactForm />} />
                  <Route path="movies" element={<Movies />} />
                  <Route path="series" element={<Series />} />
                </Routes>
               
              </>
            }
          />
        </Routes>
         <Footer />
      </BrowserRouter>
    </>
  )
}

export default App
