import { useTranslation } from "react-i18next"
import catFlag from "../assets/cat.svg"
import englishFlag from "../assets/eng.svg"
import espanolFlag from "../assets/spa.svg"


const locales = {
 
  es: { title: "Español", flag: espanolFlag },
  en: { title: "English", flag: englishFlag },
  cat: { title: "Català", flag: catFlag },
}

export default function Languages() {
  const { i18n } = useTranslation("translation")

  return (
    <div className=" d-flex justify-content-center">
    <div className='d-flex justify-content-end align-items-center '>
   
     {Object.keys(locales).map((locale) => (
      <div key={locale}>
      <button 
      style={{border: "none", backgroundColor: "white"}} 
        type="submit" 
        onClick={() => i18n.changeLanguage(locale) }           
        >
       <img 
                src={locales[locale].flag} 
                alt={locales[locale].title} 
                style={{ width: 25, height: 25}} 

                />  
      </button>
      </div>
      
     ))}  

  </div>
  </div>

  )
}

