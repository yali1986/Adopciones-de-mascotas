import logo from "../assets/LOGO.png"
import { Link, useLocation } from "react-router-dom"

export default function Header() {
    const location = useLocation()
    const isHome = location.pathname === '/'
    const isForm = location.pathname === '/form'

    return (
        <>
            <div className="container-fluid">
                <div className="row text-center bg-warning">
                    <div className="col-3">
                        {isHome ? (
                            <img style={{ maxHeight: "300px", maxWidth: "200px" }}
                                className="card p-3 img-fluid mx-auto my-4"
                                src={logo}
                                alt="Logo de Veu Animal, asociación protectora de animales"
                            />
                        ) : (
                            <Link to="./">
                                <img style={{ maxHeight: "300px", maxWidth: "200px" }} className="card p-3 img-fluid mx-auto my-4" src={logo} />
                            </Link>
                        )}

                    </div>

                    <h1 className="col-6 fs-2 my-auto">Adopciones en Barcelona</h1>
                    <div className="card-body col-3 my-auto">
                        <a href="https://www.teaming.net/veuanimal-santacolomadegramenet-bcn" target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'underline', textDecorationColor: 'black' }}>
                            <h5 className="fs-6" style={{ color: "black" }}>Hazte TEAMING</h5>
                            <h6 style={{ color: "black" }}>desde 1€ al mes</h6>
                        </a>
                    </div>
                </div>



                <div className="row bg-black pt-1">
                    <div className="col-3 my-auto text-white text-center" >
                        {isForm ? (
                            ""
                        ) : (
                            <Link to="/form?type=partner" style={{ textDecoration: 'underline', textDecorationColor: 'white' }}>
                                <h6 style={{ color: "white" }}>¿Quiéres ser socio?</h6>
                            </Link>
                        )}
                    </div>


                    <div className="col-6 text-white my-auto text-center">
                        {isForm ? (
                            ""
                        ) : (
                            <Link to="/form?type=contact" style={{ textDecoration: 'underline', textDecorationColor: 'white' }}>
                                <h6 style={{ color: "white" }}>Contacta</h6>
                            </Link>
                        )}

                    </div>

                    <div className="col-3 my-auto text-white text-center">
                        <h6>Idiomas</h6>

                    </div>
                </div>

            </div>
        </>

    )

}
