import { createContext, useContext, useState, useEffect } from 'react'
import { getAuth, onAuthStateChanged } from 'firebase/auth'
import appFirebase from '../credenciales'


const AuthContext = createContext()

export const useAuth = () => {
  return useContext(AuthContext)
}

export const AuthProvider = ({ children }) => {
  const [usuario, setUsuario] = useState(null)

  useEffect(() => {
    const auth = getAuth(appFirebase)
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
    <AuthContext.Provider value={{ usuario }}>
      {children}
    </AuthContext.Provider>
  )
}