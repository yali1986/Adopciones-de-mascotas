import construction from "../assets/construction.png"
import { useTranslation } from "react-i18next";


export default function Voluntariado() {
    const { t } = useTranslation("translation")

    return (
        <div className='container-fluid text-center'>
            <h4 className=' my-5'>{t("main.welcomevolunteer")}</h4>
            <h4 className='my-3'>{t("main.thanks")}</h4>


            <div className="text-center m-5 mx-auto p-5">

            <img src={construction} alt="Página en construcción" className="img-fluid mx-auto my-2" style={{transform: "scale(1.8)"}}/>
            </div>

        </div>
    )
}
