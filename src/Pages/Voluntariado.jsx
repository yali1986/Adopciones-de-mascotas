import construction from "../assets/construction.png"


export default function Voluntariado() {
    return (
        <div className='container-fluid text-center'>
            <h4 className=' my-5'>Bienvenido a la página de voluntarios de Veu Animal</h4>
            <h4 className='my-3'>Gracias por formar parte de nuestro equipo!</h4>


            <div className="text-center m-5 mx-auto p-5">

            <img src={construction} alt="Página en construcción" className="img-fluid mx-auto my-2" style={{transform: "scale(1.8)"}}/>
            </div>

        </div>
    )
}
