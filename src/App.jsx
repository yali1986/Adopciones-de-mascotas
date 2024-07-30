
import './App.css';
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import appFirebase from './credenciales'
import { getAuth, onAuthStateChanged } from "firebase/auth"
import { AuthProvider, useAuth } from './context/AuthContext'
import { useState, useEffect } from 'react'
import Home from './Pages/Home';
import Login from './Pages/Login';
import Header from './components/Header';
import Footer from './components/Footer';
import Form from './Pages/Form';
import CardDetail from './Pages/CardDetail';
import { CatProvider } from './context/CatContext';
import { Suspense } from 'react';
import Voluntariado from './Pages/Voluntariado';

const auth = getAuth(appFirebase)

function App() {
  const [usuario, setUsuario] = useState(null)

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (usuarioFirebase) => {

      if (usuarioFirebase) {
        setUsuario(usuarioFirebase)
      } else {
        setUsuario(null)
      }
    })

    return () => unsubscribe()
  }, [])

  return (
    <AuthProvider>
    <BrowserRouter>    
        <CatProvider>
          <Header />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/detail" element={<CardDetail />} />
            <Route path="/form" element={<Form />} />
            <Route path="/login" element={<Login />} />
            <Route path="/voluntariado" element={usuario ? <Voluntariado /> : <Navigate to="/login" />} />
          </Routes>
          <Footer />
        </CatProvider>  
    </BrowserRouter>
    </AuthProvider>
  )
}

export default function WrappedApp() {
  return (
    <Suspense fallback="...loading">
      <App />
    </Suspense>
  )
}