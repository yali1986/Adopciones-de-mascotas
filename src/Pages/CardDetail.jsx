import { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { CatContext } from '../context/CatContext';

const CardDetail = () => {
    const { selectedCat, selectCat } = useContext(CatContext);
    const navigate = useNavigate();

    if (!selectedCat) {
        return <p>No se ha seleccionado ningún gato.</p>;
    }

    const handleFormNavigation = () => {
        navigate('/form')
    }

    return (
        <div className='container-fluid'>
            <div className='card w-75 mx-auto m-4 shadow p-3' style={{ border: "none" }}>
                <h2 className='mx-auto ms-xl-3'>{selectedCat.name}</h2>
                <img src={selectedCat.image} alt={selectedCat.name} style={{maxHeight:"800px", maxWidth:"800px"}}/>
                <div className='card-body'>
                    <p>Age: {selectedCat.age}</p>
                    <p>{selectedCat.story}</p>
                    <p>Characteristics: {selectedCat.characteristics}</p>



                    <div className='bg-black p-3 row animate__animated animate__fadeInUp' style={{maxHeight:"800px", maxWidth:"800px"}}>
        <div className='row mx-auto'>
          <div className='col d-flex flex-column flex-md-row justify-content-around text-center'>
            <p className='card-text text-white my-2'>
              {selectedCat.name === "The Babies" ? "¿Te decides a adoptarnos?" : "¿Te decides a adoptarme?"}
            </p>
            <p className='card-text text-white my-2'>
              {selectedCat.name === "The Babies" ? "¿O puedes brindarnos un hogar de acogida?" : "¿O puedes brindarme un hogar de acogida?"}
            </p>
          </div>
          <div className='row'>
            <button className='btn btn-warning col-6 col-md-4 mx-auto my-2' onClick={handleFormNavigation}>
              Rellena el Formulario
            </button>
          </div>
        </div>
      </div>

      <div className='p-3 row animate__animated animate__fadeInUp animate__delay-1s' style={{maxHeight:"800px", maxWidth:"800px"}}>
        <div className='col text-center'>
          <Link to="/">
            <button className='btn btn-outline-warning my-2'>
              Volver al listado
            </button>
          </Link>
        </div>
      </div>


                </div>
            </div>
        </div>
    )
}

export default CardDetail