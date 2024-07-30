import { Link, useLocation, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useAuth } from '../context/AuthContext'
import logo from "../assets/LOGO.png";
import './header.css'; 
import appFirebase from '../credenciales';
import { getAuth, signOut } from "firebase/auth";

export default function Header() {
  const location = useLocation()
  const { t } = useTranslation("translation")
  const { usuario } = useAuth()
  const isHome = location.pathname === '/'
  const isForm = location.pathname === '/form'
  const auth = getAuth(appFirebase)
  const navigate = useNavigate()

  const handleLogout = () => {
    signOut(auth).then(() => {
        navigate("/")
    }).catch(error => {
        console.error("Error de signing out: ", error)
    })
    }
  const handleLogin = () => {
    signOut(auth).then(() => {
        navigate("/login")
    }).catch(error => {
        console.error("Error de signing out: ", error)
    })
    }

  return (
    <>
      <div className="container-fluid">
        <div className="row pt-1 text-end bg-warning">
          <div className="col-8">
            {isForm ? (
              ""
            ) : (
              <Link to="/form?type=voluntier" style={{ textDecoration: 'none' }}>
                <h6 className="text-black me-5 px-5 pt-2">Únete a nuestro equipo de voluntarios</h6>
              </Link>
            )}
          </div>          

          <div className="col-3 d-flex justify-content-end">
          {isForm ? (
              ""
            ) : (
                usuario ? (
                <button className="btn btn-link text-black me-5 px-5 bg-black text-white border-white mb-1" onClick={handleLogout} style={{ textDecoration: 'none' }}>
                  Logout
                </button>
              ) : ( 
                <button className="btn btn-outline-dark text-black me-5 px-5 text-white border-white mb-1" onClick={handleLogin} style={{ textDecoration: 'none' }}>
                  Login TEAM
                </button>
              ) 
            )}
          </div>
        </div>

        <div className="row text-center">
          <div className="col-3">
            {isHome ? (
              <img style={{ maxHeight: "300px", maxWidth: "200px", border: "none" }}
                   className="card p-3 img-fluid mx-auto my-2"
                   src={logo}
                   alt="Logo de Veu Animal, asociación protectora de animales"
              />
            ) : (
              <Link to="./">
                <img style={{ maxHeight: "300px", maxWidth: "200px",border: "none" }} className="card p-3 img-fluid mx-auto my-4" src={logo} />
              </Link>
            )}
          </div>

          <div className="row p-3 w-50">
            <div className="col-3 my-auto text-black text-center">
              {isForm ? (
                ""
              ) : (
                <Link to="/form?type=partner" style={{ textDecoration: 'none' }}>
                  <h6 style={{ color: "black" }}>¿Quiéres ser socio?</h6>
                </Link>
              )}
            </div>

            <div className="col-6 text-black my-auto text-center">
              {isForm ? (
                ""
              ) : (
                <Link to="/form?type=contact" style={{ textDecoration: 'none' }}>
                  <h6 style={{ color: "black" }}>Contacto</h6>
                </Link>
              )}
            </div>

            <div className="col-3 my-auto text-black text-center">
              <h6>Idiomas</h6>
            </div>
          </div>

          <div className="col-3 mt-4 teaming-container">
            <div className="teaming-overlay"></div>
            <a href="https://www.teaming.net/veuanimal-santacolomadegramenet-bcn" target="_blank" rel="noopener noreferrer" className="teaming-text" style={{ textDecoration: 'none' }}>
              <h4 className="fs-6">Hazte</h4>
              <h5 className="fs-5 fw-bolder">TEAMING</h5>  
              <div className="row text-end teaming-text">
        
          <h6 className="fs-6 col text-center ">desde 1€ al mes</h6>
          </div>          
            </a>
            
          </div>          
         
        </div>

        <div className="row d-flex text-center justify-content-center">
          <h1 className="col-6 fs-2 mt-3">{t("main.title")}</h1>
        </div>
      </div>
    </> 
   )
}