import { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { CatContext } from '../context/CatContext';

const CatCards = () => {
  const { cats, selectCat } = useContext(CatContext);
  const navigate = useNavigate();

  const handleMoreInfoClick = (cat) => {
    selectCat(cat);
    navigate('/detail');
  };

  return (
    <div className="d-flex flex-wrap gap-5 justify-content-center my-5 py-4">
      {cats.map(cat => (
        <div key={cat.id} className="card shadow" style={{ border: "none", cursor: "pointer" }}>
          <div className='card-body text-center'>
            <img className='card-img-top' src={cat.image} alt={cat.name} style={{ maxHeight: "180px", maxWidth: "250px" }} />
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
