
import redes from "../assets/redesSoc.png"
import logo from "../assets/LOGO.png"

export default function Footer() {
  return (
    <>
      <div className="container-fluid">
    <div className='row p-3 bg-black mt-5'>

    </div>
            <div className="row text-center bg-light">
                <div className="col-3 ">
                <img style={{ maxHeight: "300px", maxWidth: "200px", border: "none" }} className="card p-3 img-fluid mx-auto my-4" src={redes} />  
                </div>

                <div className="col-6 fs-2 my-auto">
                <h5 className="fs-6">Asociación protectora de animales VOZ ANIMAL</h5>
                <h5 className="fs-6">Ap. correos 125, 08921 Sta Coloma de Gramanet - Barcelona</h5>
                <h5 className="fs-6">Email: veuanimal@veuanimal.org</h5>
                    
                </div>


                <div className="card-body col-3 my-auto">
                <img style={{ maxHeight: "250px", maxWidth: "150px", border:"none" }} className="card p-2 img-fluid mx-auto my-4" src={logo} />
                </div>


            </div>
            </div>
        </>
  )
}
