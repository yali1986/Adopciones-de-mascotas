import logo from "../assets/LOGO.png"
import { Link, useLocation } from "react-router-dom"
import { useTranslation } from "react-i18next"
// import './header.css'
import teaming from "../assets/teaming.png"

export default function Header() {
    const location = useLocation()
    const { t } = useTranslation("translation")
    const isHome = location.pathname === '/'
    const isForm = location.pathname === '/form'

    return (
        <>
            <div className="container-fluid">

            <div className="row pt-1 text-end bg-warning">             
            <div className="col-8">
                {isForm ? (
                            ""
                        ) : (
                            <Link to="/form?type=voluntier" style={{ textDecoration: 'none'}}>
                <h6 className="text-black me-5 px-4">Únete a nuestro equipo de voluntarios</h6>                                     
                </Link>                 
                        )}
                        </div>
                        <div className="col-3 d-flex justify-content-end pe-0">
                        <p className="me-2 mb-0">💕</p>  
                        <h6>Login Voluntarios</h6>   
                        </div>     

                        </div>                                                 
             
             

                <div className="row text-center">
                    <div className="col-3 mt-4">
                        {isHome ? (
                            <img style={{ maxHeight: "300px", maxWidth: "200px", border: "none" }}
                                className="card p-3 img-fluid mx-auto my-2"
                                src={logo}
                                alt="Logo de Veu Animal, asociación protectora de animales"
                            />
                        ) : (
                            <Link to="./">
                                <img style={{ maxHeight: "300px", maxWidth: "200px" }} className="card p-3 img-fluid mx-auto my-4" src={logo} />
                            </Link>
                        )}

                    </div>


                    <div className="row p-3 w-50">
                    <div className="col-3 my-auto text-black text-center" >
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
                            <Link to="/form?type=contact" style={{ textDecoration: 'none'}}>
                                <h6 style={{ color: "black"}}>Contacto</h6>                          
                            </Link>
                        )}

                    </div>

                    <div className="col-3 my-auto text-black text-center">
                        <h6>Idiomas</h6>

                    </div>
                </div>

               

                  
                   

                    <div className="card-body col-3 mt-4" style={{backgroundImage: `url(${teaming})`,  height: "120px", width: "200px", scale: "0.7"}}>
                        <a href="https://www.teaming.net/veuanimal-santacolomadegramenet-bcn" target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none'}}>
                            <h4 className="fs-6 ms-4" style={{ color: "black" }}>Hazte</h4>
                            <h5 className="fs-5 ms-4" style={{ color: "black" }}>TEAMING</h5>
                            <h6  className="ms-4" style={{ color: "black" }}>desde 1€ al mes</h6>
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
