import logo from "../assets/LOGO.png"
import { Link } from "react-router-dom"

export default function Header() {
    return (
        <>
            <div className="container-fluid">
                <div className="row text-center bg-warning">


                    <div className="col-3">
                        <img style={{ maxHeight: "300px", maxWidth: "200px" }} className="card p-3 img-fluid mx-auto my-4" src={logo} />
                    </div>
                    <h1 className="col-6 fs-2 my-auto">Adopciones en Barcelona</h1>
                    <div className="card-body col-3 my-auto">
                        <h5 className="fs-6">Hazte TEAMING</h5>
                        <h6>desde 1€ al mes</h6>
                    </div>


                </div>
                <div className="row bg-black pt-1">
                    <div className="col-3 my-auto text-white text-center">
                        <h6>Hazte socio</h6>
                    </div>

                    <div className="col-6 text-white my-auto text-center">


                        <Link to="/form" style={{ textDecoration: 'underline', textDecorationColor: 'white' }}>
                            <h6 style={{ color: "white" }}>Contacta</h6>
                        </Link>


                    </div>

                    <div className="col-3 my-auto text-white text-center">
                        <h6>Idiomas</h6>
                    </div>
                </div>
            </div>
        </>

    )

}
