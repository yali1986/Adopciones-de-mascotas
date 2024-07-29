import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { CatContext } from '../context/CatContext';

const CatCards = () => {
  const { cats, selectCat } = useContext(CatContext);
  const navigate = useNavigate();

  const handleMoreInfoClick = (cat) => {
    selectCat(cat);
    navigate('/detail');
  };

  return (
    <div className="d-flex flex-wrap gap-5 justify-content-center my-3 py-4">
      {cats.map(cat => (
        <div key={cat.id} className="card shadow" style={{ border: "none", cursor: "pointer" , width: "400px"}}>
          <div className='card-body text-center'>
          <div className='ratio ratio-4x3' style={{ background: `url('${cat.image}')`, backgroundSize: "cover", position: "center"}}>


</div>
          
            <h2 className='card-title mt-3'>{cat.name}</h2>
            <p className='card-text'>Age: {cat.age}</p>
            <p className='card-text'>{cat.story}</p>          
            <button className='btn btn-warning' onClick={() => handleMoreInfoClick(cat)}>More info</button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default CatCards;
