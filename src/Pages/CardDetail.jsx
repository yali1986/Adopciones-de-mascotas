import { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { CatContext } from '../context/CatContext';
import '../components/cardDetail.css';
import { useTranslation } from "react-i18next";

const CardDetail = () => {
    const { selectedCat, selectCat } = useContext(CatContext)
    const navigate = useNavigate()
    const { t } = useTranslation("translation")

    const handleFormNavigation = () => {
        navigate('/form')
    }

    return (
        <div className='container-fluid'>
            <div className='col-10 mx-auto' >

                <div className='card w-50 mx-auto m-4 shadow p-5' style={{ border: "none" }} >
                    <h2 className='mx-auto ms-xl-3' style={{cursor:"default"}}>{selectedCat.name}</h2>
                    <div className='d-flex w-75'>


                        <img className='imgDetail ratio ratio-4x3' src={selectedCat.image} alt={selectedCat.name} style={{maxWidth: "400px", maxHeight: "700px" }} />



                        <div className='card-text ms-5 mt-3 '>
                            <h4 className='my-2'>{t("main.vetinfo")}</h4>
                            <p>Microship: {selectedCat.microship}</p>
                            <p>{t("main.vaccines")}: {selectedCat.vaccines}</p>
                            <p>{t("main.deworming")}: {selectedCat.dewormed}</p>
                            <p>Castrado: {selectedCat.sterilized}</p>
                        </div>
                    </div>



                    <div className='card-body' style={{ maxHeight: "400px", maxWidth: "700px" }}>
                        <p>{t("main.age")}: {selectedCat.age}</p>
                        <p>{selectedCat.story}</p>   
                        <p>{t("main.characteristics")}: {selectedCat.characteristics}</p>



                        <div className='bg-black p-3 row animate__animated animate__fadeInUp' style={{ maxHeight: "400px", maxWidth: "700px" }}>
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
                                    {t("main.ompleform")}
                                    </button>
                                </div>
                            </div>
                        </div>

                        <div className='p-3 row animate__animated animate__fadeInUp ' style={{ maxHeight: "400px", maxWidth: "700px" }}>
                            <div className='col text-center'>
                                <Link to="/">
                                    <button className='btn btn-outline-warning my-2'>
                                    {t("main.backlist")}
                                    </button>
                                </Link>
                            </div>
                        </div>


                    </div>
                </div>
            </div>
        </div>
    )
}

export default CardDetail
