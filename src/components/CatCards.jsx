import { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { CatContext } from '../context/CatContext'
import "./catCards.css"
import { useTranslation } from "react-i18next"

const CatCards = () => {
  const { t } = useTranslation("translation")
  const { cats, selectCat } = useContext(CatContext);
  const navigate = useNavigate();

  const handleMoreInfoClick = (cat) => {
    selectCat(cat)
    navigate('/detail')
  };

  return (
    <div className="d-flex flex-wrap gap-5 justify-content-center my-3 py-4">
      {cats.map(cat => (
        <div key={cat.id} className="card shadow-sm cat-card rounded-4 border border-light p-2" onClick={() => handleMoreInfoClick(cat)} style={{ border: "none", cursor: "pointer" , width: "300px"}}>
          <div className='card-body text-center' >
          <div className='ratio ratio-4x3 ' style={{ background: `url('${cat.image}')`, backgroundSize: "cover", position: "center", clipPath: "polygon(50% 0%, 100% 8%, 98% 100%, 2% 100%, 0 8%)" }}>
</div>
          
            <h2 className='card-title mt-3'>{cat.name}</h2>
            <p className='card-text mb-1 mt-2 text-secondary'>Age: {cat.age}</p>
            <p className='card-text mb-3 text-secondary'>{cat.story}</p>          
            <button className='btn btn-warning btn-lg rounded-5 px-5 fs-6 w-75' onClick={() => handleMoreInfoClick(cat)}>{t("main.moreinfo")}</button>
          </div>
        </div>
      ))}
    </div>
  )
}

export default CatCards
