import React, { Suspense } from 'react'
import NavBar from './views/Navbar/Navbar'
import { Route, Routes } from 'react-router-dom'
import LandingPage from './views/LandingPage/LandingPage'
import Footer from './views/Footer/Footer'
import Auth from '../hoc/auth'
import RegisterPage from './views/User/RegisterPage/RegisterPage'
import LoginPage from './views/User/LoginPage/LoginPage'
import RegisterTeam from './views/Team/RegisterTeam/RegisterTeam'
import DetailTeamPage from './views/Team/DetailTeamPage/DetailTeamPage'

function App() {
    // null 모든 유저 이용가능
    // true 로그인한 유저만 이용가능
    // false 로그인 안한 유저만 이용가능
    const AuthLandingPage = Auth(LandingPage, null);
    const AuthRegisterPage = Auth(RegisterPage, false);
    const AuthLoginPage = Auth(LoginPage, false);
    const AuthRegisterTeam = Auth(RegisterTeam, true);
    const AuthDetailTeamPage = Auth(DetailTeamPage, null);

  return (
    <Suspense>
        <NavBar />
        <div style={{ paddingTop: '69px', minHeight: 'calc(100vh - 80px)' }}>
            <Routes>
                <Route path="/" element={<AuthLandingPage />} />
                <Route path="/login" element={<AuthLoginPage />} />
                <Route path="/register" element={<AuthRegisterPage />} />
                <Route path="/teams/register" element={<AuthRegisterTeam />} />
                <Route path="/teams/:teamId" element={<AuthDetailTeamPage />} />
            </Routes>
        </div>
        <Footer />
    </Suspense>
  )
}

export default App