 import { useState, useRef } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import appFirebase from '../credenciales'
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth"

const auth = getAuth(appFirebase)

export default function Login() {
  const [registrando, setRegistrando] = useState(false)
  const emailRef = useRef()
  const passwordRef = useRef()
  const navigate = useNavigate()
  const location = useLocation()
  const from = location.state?.from?.pathname || "/voluntariado" //Redirige a la página de voluntariado

  const functAuthentication = async (e) => {
    e.preventDefault()
    const correo = emailRef.current.value
    const contrasenya = passwordRef.current.value

    try {
      if (registrando) {
        await createUserWithEmailAndPassword(auth, correo, contrasenya)
      } else {
        await signInWithEmailAndPassword(auth, correo, contrasenya)
      }
      navigate(from, { replace: true })
    } catch (error) {
      if (registrando) {
        alert("Error registering user")
      } else {
        alert("Incorrect username or password")
      }
    }
  }

  const toggleRegistrando = () => {
    setRegistrando(!registrando)
    emailRef.current.value = ''
    passwordRef.current.value = ''
  }

  return (
    <div className="container-fluid vh-100 d-flex justify-content-center align-items-center">
      <div className="row w-100">
        <div className="col-md-6 offset-md-3 text-center">
          
          <div className='card card-body shadow-lg p-4'>
            <h2 className='mb-4'>{registrando ? "Sign up" : "Voluntarios"}</h2>
            <form onSubmit={functAuthentication}>
              <div className="mb-3">
                <input type="email" placeholder='Introduce tu Email' id="email" className='form-control' required ref={emailRef} />
              </div>
              <div className="mb-3">
                <input type="password" placeholder='Introduce tu contraseña' id="password" className='form-control' required ref={passwordRef} />
              </div>
              <button className='btn btn-warning w-100 mt-3 text'>{registrando ? "Sign up" : "Login"}</button>
            </form>
            <div className='mt-4 bg-dark text-white rounded'>
              <h6 className='d-inline text-warning'>{registrando ? " " : " "}</h6>
              <button className='btn btn-link text-warning mb-1' style={{ textDecoration: 'none'}} onClick={toggleRegistrando}>
                {registrando ? "Do you already have an account? Login " : "You do not have an account? Sign up"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
