import { useState, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import appFirebase from '../credenciales';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { useTranslation } from 'react-i18next';

const auth = getAuth(appFirebase);

// Obtener el PIN autorizado desde las variables de entorno
const AUTHORIZED_PIN = import.meta.env.VITE_REACT_APP_AUTHORIZED_PIN;
console.log("Authorized PIN from environment:", AUTHORIZED_PIN);

export default function Login() {
  const { t } = useTranslation("translation");
  const [registrando, setRegistrando] = useState(false);
  const [pinValidated, setPinValidated] = useState(false); // Estado para validar el PIN
  const [pinError, setPinError] = useState(false); // Estado para errores de PIN
  const emailRef = useRef();
  const passwordRef = useRef();
  const pinRef = useRef(); // Referencia para el PIN
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/voluntariado";

  const functAuthentication = async (e) => {
    e.preventDefault();
    const correo = emailRef.current.value;
    const contrasenya = passwordRef.current.value;

    try {
      if (registrando) {
        if (!pinValidated) {
          setPinError(true);
          return;
        }
        await createUserWithEmailAndPassword(auth, correo, contrasenya);
      } else {
        await signInWithEmailAndPassword(auth, correo, contrasenya);
      }
      navigate(from, { replace: true });
    } catch (error) {
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

  return (
    <div className="container-fluid vh-100 d-flex justify-content-center align-items-center">
      <div className="row w-100">
        <div className="col-md-6 offset-md-3 text-center">
          <div className='card card-body shadow-lg p-4'>
            <h2 className='mb-4'>{registrando ? t("main.signup") : t("main.volunteers")}</h2> 

          
            <div className='row px-3'>
              <p className="alert alert-warning text-black">
                {registrando 
                  ? (t ("main.attentionnotice")) 
                  : (t ("main.attentionnoticelogin"))
                }
              </p>
              </div>

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
        
                </div>
                <div className="mb-3">
                  <input type="password" placeholder={t("main.placeholderpassword")} id="password" className='form-control' required ref={passwordRef} />
                </div>
                <button className='btn btn-warning w-100 mt-3 text'>{registrando ? t("main.signup") : "Login"}</button>
              </form>
            )}

         
          </div>
        </div>
      </div>
    </div>
  );
}