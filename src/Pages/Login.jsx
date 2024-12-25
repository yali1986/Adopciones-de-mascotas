import { useState, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import appFirebase from '../credenciales';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, sendEmailVerification, sendPasswordResetEmail } from "firebase/auth";
import { useTranslation } from 'react-i18next';

const auth = getAuth(appFirebase);
const AUTHORIZED_PIN = import.meta.env.VITE_REACT_APP_AUTHORIZED_PIN;

export default function Login() {
  const { t } = useTranslation("translation");
  const [registrando, setRegistrando] = useState(false);
  const [pinValidated, setPinValidated] = useState(false);
  const [pinError, setPinError] = useState(false);
  const [emailError, setEmailError] = useState('');
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [showResetPassword, setShowResetPassword] = useState(false);
  const emailRef = useRef();
  const passwordRef = useRef();
  const pinRef = useRef();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/voluntariado";

  const validateEmail = (email) => {
    const re = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return re.test(String(email).toLowerCase());
  };

  const functAuthentication = async (e) => {
    e.preventDefault();
    const email = emailRef.current.value;
    const contrasenya = passwordRef.current.value;

    if(!validateEmail(email)) {
      setEmailError("invalidEmailFormat");
      alert("invalidEmailFormat");
      return;
    }

    try {
      if (registrando) {
        if (!pinValidated) {
          setPinError(true);
          return;
        }

        const userCredential = await createUserWithEmailAndPassword(auth, email, contrasenya);
        await sendEmailVerification(userCredential.user);
        alert(t("main.verificationSent"));
        return;

      } else {
        const userCredential = await signInWithEmailAndPassword(auth, email, contrasenya);

        // Eliminamos la verificación del correo electrónico durante el login
        // ya que solo debe realizarse en el registro inicial
        // Aquí puedes manejar cualquier lógica adicional que necesites

        navigate(from, { replace: true });
      }
    } catch (error) {
      let errorMessage = "";
      if (error.code === 'auth/user-not-found') {
        errorMessage = "emailNotFound";
      } else if (error.code === 'auth/wrong-password') {
        errorMessage = "wrongPassword";
      } else {
        errorMessage = "errorLogin";
      }

      setEmailError(errorMessage);
      alert(errorMessage);
      
      if (registrando) {
        alert(t("main.erroruser"));
      } else {
        alert(t("main.errorlogin"));
      }
    }
  };

  const toggleRegistrando = () => {
    setRegistrando(!registrando);
    emailRef.current.value = '';
    passwordRef.current.value = '';
    setPinValidated(false);
    setPinError(false);
    setEmailError('');
  };

  const handlePinSubmit = (e) => {
    e.preventDefault();
    const pin = pinRef.current.value;
    if (pin === AUTHORIZED_PIN) {
      setPinValidated(true);
      setPinError(false);
    } else {
      setPinError(true);
      setPinValidated(false);
    }
  };

  const handlePasswordReset = async (e) => {
    e.preventDefault();
    try {
      await sendPasswordResetEmail(auth, email);
      setMessage("Password reset email sent!");
    } catch (error) {
      setMessage(`Error: ${error.message}`);
    }
  };

  const toggleResetPassword = () => {
    setShowResetPassword(!showResetPassword);
    setEmailError('');
    setMessage('');
    setEmail('');
  };

  return (
    <div className="container-fluid vh-100 d-flex justify-content-center align-items-center">
      <div className="row w-100">
        <div className="col-md-6 offset-md-3 text-center">
          <div className='card card-body shadow-lg p-4'>
            <h2 className='mb-4'>
              {showResetPassword ? "Reset Password" : registrando ? t("main.signup") : t("main.volunteers")}
            </h2> 

            {!showResetPassword ? (
              <>
                {!pinValidated && registrando && (
                  <div className='row px-3'>
                    <p className="alert alert-warning text-black">
                      {t("main.attentionnotice")}
                    </p>
                  </div>
                )}

                <div className='mt-2 bg-dark text-white rounded'>
                  <button className='btn btn-link text-warning my-' style={{ textDecoration: 'none' }} onClick={toggleRegistrando}>
                    {registrando ? t("main.loginok") : t("main.signupok")}  
                  </button>
                </div>

                {registrando && !pinValidated && (
                  <>
                    <form onSubmit={handlePinSubmit}>
                      <div className="my-3">
                        <input type="text" placeholder={t("main.placeholderpin")} id="pin" className='form-control' required ref={pinRef} />
                      </div>
                      <button className='btn btn-warning w-100 mt-3 text'>{t("main.validatepin")}</button>
                    </form>
                    {pinError && <p className="text-danger">{t("main.invalidpin")}</p>}
                  </>
                )}

                {(pinValidated || !registrando) && (
                  <form onSubmit={functAuthentication}>
                    <div className="my-3">
                      <input type="email" placeholder={t("main.placeholderemail")} id="email" className='form-control' required ref={emailRef} /> 
                      {emailError && <p className="text-danger">{emailError}</p>}
                    </div>
                    <div className="mb-3">
                      <input type="password" placeholder={t("main.placeholderpassword")} id="password" className='form-control' required ref={passwordRef} />
                    </div>
                    <button className='btn btn-warning w-100 mt-3 text'>{registrando ? t("main.signup") : "Login"}</button>
                  </form>
                )}

                <button
                  className="btn btn-link mt-3"
                  onClick={toggleResetPassword}
                >
                  Forgot Password?
                </button>
              </>
            ) : (
              <form onSubmit={handlePasswordReset}>
                <div className="my-3">
                  <input
                    type="email"
                    placeholder="Enter your email"
                    className='form-control'
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
                <button className='btn btn-warning w-100 mt-3'>Send Reset Email</button>
                {message && <p className="mt-3">{message}</p>}
                <button
                  className="btn btn-link mt-3"
                  onClick={toggleResetPassword}
                >
                  Back to Login
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}





// import { useState, useRef } from 'react';
// import { useNavigate, useLocation } from 'react-router-dom';
// import appFirebase from '../credenciales';
// import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, sendEmailVerification, sendPasswordResetEmail } from "firebase/auth";
// import { useTranslation } from 'react-i18next';

// const auth = getAuth(appFirebase)
// const AUTHORIZED_PIN = import.meta.env.VITE_REACT_APP_AUTHORIZED_PIN

// export default function Login() {
//   const { t } = useTranslation("translation")
//   const [registrando, setRegistrando] = useState(false)
//   const [pinValidated, setPinValidated] = useState(false)
//   const [pinError, setPinError] = useState(false)
//   const [emailError, setEmailError] = useState('')
//   const [email, setEmail] = useState("")
//   const [message, setMessage] = useState("")
//   const emailRef = useRef()
//   const passwordRef = useRef()
//   const pinRef = useRef() // Referencia para el PIN
//   const navigate = useNavigate()
//   const location = useLocation()
//   const from = location.state?.from?.pathname || "/voluntariado"  // establece la ruta a la que se debe redirigir al usuario después de un login o registro exitoso
  
//   // Obtenemos el objeto de ubicación actual
// // const location = useLocation();

// // Establecemos la ruta de redirección después del login o registro
// // Si location.state y location.state.from existen, usamos location.state.from.pathname
// // Si no, usamos la ruta por defecto "/voluntariado"
  
//   // location.state:

//   // location es el objeto devuelto por useLocation.
//   // state es una propiedad del objeto location que puede contener un objeto de estado. Este estado se puede pasar cuando se navega a una nueva ruta usando navigate en React Router.
//   // location.state?.from?.pathname:
  
//   // ?. es el operador de encadenamiento opcional. Verifica si state y from existen antes de intentar acceder a pathname. Si cualquiera de ellos es undefined o null, la expresión devuelve undefined en lugar de lanzar un error.
//   // from es una propiedad que puede estar dentro del objeto state y contiene un objeto de ubicación previa.
//   // pathname es una propiedad del objeto from que contiene la ruta a la que el usuario intentaba acceder antes de ser redirigido al login.
//   // || "/voluntariado";:
  
//   // Esto es un operador lógico OR. Si location.state?.from?.pathname es undefined o null (es decir, el usuario no fue redirigido desde una ruta específica), se utiliza la ruta por defecto "/voluntariado".

//   const validateEmail = (email) => {
//     const re = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
//     return re.test(String(email).toLowerCase())
//   }

//   const functAuthentication = async (e) => {
//     e.preventDefault()
//     const email = emailRef.current.value
//     const contrasenya = passwordRef.current.value

//     if(!validateEmail(email)) {
//       setEmailError("invalidEmailFormat")
//       alert("invalidEmailFormat")
//       
//       return
//     }

//     try {
//       if (registrando) {
//         if (!pinValidated) {
//           setPinError(true)
//           return
//         }

//         const userCredential = await createUserWithEmailAndPassword(auth, email, contrasenya)
//         await sendEmailVerification(userCredential.user)
//         alert(t("main.verificationSent"))        
//         // No navegar hasta que el email esté verificado
//         return

//       } else {
//         const userCredential = await signInWithEmailAndPassword(auth, email, contrasenya)
//         if (!userCredential.user.emailVerified) {
//           alert(t("main.verifyEmail"))          
//           return
//       }   

//       navigate(from, { replace: true })
//      }
//     } catch (error) {
//       let errorMessage = ""
//       if (error.code === 'auth/user-not-found') {
//         errorMessage = "emailNotFound"
//         //t("main.emailNotFound")
//       } else if (error.code === 'auth/wrong-password') {
//         errorMessage = "wrongPassword"
//        //t("main.wrongPassword")
//       } else {
//         errorMessage = "errorLogin"
//         //t("main.errorLogin")
//       }

//       setEmailError(errorMessage)
//       alert(errorMessage)
      
      
//       if (registrando) {
//         alert(t("main.erroruser"))
//       } else {
//         alert(t("main.errorlogin"))
//       }
//     }
//   }

//   const toggleRegistrando = () => {
//     setRegistrando(!registrando)
//     emailRef.current.value = ''
//     passwordRef.current.value = ''
//     setPinValidated(false)
//     setPinError(false)
//     setEmailError('')    
//   }

//   const handlePinSubmit = (e) => {
//     e.preventDefault();
//     const pin = pinRef.current.value
//     if (pin === AUTHORIZED_PIN) {
//       setPinValidated(true)
//       setPinError(false)
//     } else {
//       setPinError(true)
//       setPinValidated(false)
//     }
//   }

//   const handlePasswordReset = async (e) => {
//     e.preventDefault();
//     try {
//       await sendPasswordResetEmail(auth, email);
//       setMessage("Password reset email sent!");
//     } catch (error) {
//       setMessage(`Error: ${error.message}`);
//     }
//   }

//   return (
//     <div className="container-fluid vh-100 d-flex justify-content-center align-items-center">
//     <div className="row w-100">
//       <div className="col-md-6 offset-md-3 text-center">
//         <div className='card card-body shadow-lg p-4'>
//           <h2 className='mb-4'>
//             {showResetPassword ? "Reset Password" : registrando ? t("main.signup") : t("main.volunteers")}
//           </h2> 

//           {!showResetPassword ? (
//             <>
//               {!pinValidated && registrando && (
//                 <div className='row px-3'>
//                   <p className="alert alert-warning text-black">
//                     {t("main.attentionnotice")}
//                   </p>
//                 </div>
//               )}

//               <div className='mt-2 bg-dark text-white rounded'>
//                 <button className='btn btn-link text-warning my-' style={{ textDecoration: 'none' }} onClick={toggleRegistrando}>
//                   {registrando ? t("main.loginok") : t("main.signupok")}  
//                 </button>
//               </div>

//               {registrando && !pinValidated && (
//                 <>
//                   <form onSubmit={handlePinSubmit}>
//                     <div className="my-3">
//                       <input type="text" placeholder={t("main.placeholderpin")} id="pin" className='form-control' required ref={pinRef} />
//                     </div>
//                     <button className='btn btn-warning w-100 mt-3 text'>{t("main.validatepin")}</button>
//                   </form>
//                   {pinError && <p className="text-danger">{t("main.invalidpin")}</p>}
//                 </>
//               )}

//               {(pinValidated || !registrando) && (
//                 <form onSubmit={functAuthentication}>
//                   <div className="my-3">
//                     <input type="email" placeholder={t("main.placeholderemail")} id="email" className='form-control' required ref={emailRef} /> 
//                     {emailError && <p className="text-danger">{emailError}</p>}
//                   </div>
//                   <div className="mb-3">
//                     <input type="password" placeholder={t("main.placeholderpassword")} id="password" className='form-control' required ref={passwordRef} />
//                   </div>
//                   <button className='btn btn-warning w-100 mt-3 text'>{registrando ? t("main.signup") : "Login"}</button>
//                 </form>
//               )}

//               <button
//                 className="btn btn-link mt-3"
//                 onClick={() => setShowResetPassword(true)}
//               >
//                 Forgot Password?
//               </button>
//             </>
//           ) : (
//             <form onSubmit={handlePasswordReset}>
//               <div className="my-3">
//                 <input
//                   type="email"
//                   placeholder="Enter your email"
//                   className='form-control'
//                   value={email}
//                   onChange={(e) => setEmail(e.target.value)}
//                   required
//                 />
//               </div>
//               <button className='btn btn-warning w-100 mt-3'>Send Reset Email</button>
//             </form>
//           )}

//           {message && <p className="mt-3">{message}</p>}

//           {showResetPassword && (
//             <button
//               className="btn btn-link mt-3"
//               onClick={() => setShowResetPassword(false)}
//             >
//               Back to Login
//             </button>
//           )}
//         </div>
//       </div>
//     </div>
//   </div>
//   )
// }