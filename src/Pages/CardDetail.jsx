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
            <div className='col-10 mx-auto text-center'>
                <div className='card w-75 shadow mx-auto bg-warningcard mt-5 rounded-5 pb-3' style={{ border: "none", maxHeight: "800px" }} >
                    <div className='mx-auto'>
                        <div className='pt-5 mx-auto text-start d-flex flex-column align-items-center'>

                            <h2 className='ms-xl-3 mb-3' style={{ cursor: "default" }}>{selectedCat.name}</h2>
                            <div className='d-flex w-100 ms-5'>

                                <img className='imgDetail ratio ratio-4x3' src={selectedCat.image} alt={selectedCat.name} style={{ maxWidth: "400px", maxHeight: "700px" }} />


                                <div className='card-text ms-5 mt-5'>
                                    <h4 className='mt-3'>{t("main.vetinfo")}</h4>
                                    <p className='mb-2'>Microship: {selectedCat.microship}</p>
                                    <p className='mb-2'>{t("main.vaccines")}: {selectedCat.vaccines}</p>
                                    <p className='mb-2'>{t("main.deworming")}: {selectedCat.dewormed}</p>
                                    <p >Castrado: {selectedCat.sterilized}</p>
                                </div>
                            </div>


                            <div className='card-text'>
                                <p className='ps-5 mb-2 mt-4'>{t("main.age")}: {selectedCat.age}</p>
                                <p className='ps-5 mb-2'>{selectedCat.story}</p>
                                <p className='ps-5'>{t("main.characteristics")}: {selectedCat.characteristics}</p>


                                <div className='bg-black p-3 row rounded-2 mt-5 animate__animated animate__fadeInUp mb-3' style={{ maxHeight: "400px", maxWidth: "700px" }}>
                                    <div className='row mx-auto'>
                                        <div className='col d-flex flex-column flex-md-row justify-content-around text-center'>
                                            <p className='card-text text-white my-2'>
                                                {selectedCat.name === "The Babies" ? t("main.adopt_us") : t("main.adopt_me")}
                                            </p>
                                            <p className='card-text text-white my-2'>
                                                {selectedCat.name === "The Babies" ? t("main.foster_us") : t("main.foster_me")}
                                            </p>
                                        </div>
                                        <div className='row mx-auto'>
                                            <button className='btn bg-warning col-6 col-md-4 mx-auto my-3' onClick={handleFormNavigation}>
                                                {t("main.ompleform")}
                                            </button>
                                        </div>
                                    </div>
                                </div>

                            </div>
                        </div>

                    </div>
                </div>

                <div className='text-center mx-auto d-flex justify-content-center'>
                    <div className='p-3 animate__animated animate__fadeInUp'>
                        <Link to="/">
                            <button className='btn btn-outline-black border-black'>
                                {t("main.backlist")}
                            </button>
                        </Link>

                    </div>
                </div>
            </div>
        </div>
    )
}

export default CardDetail
