import { createContext, useState } from 'react';
import img1 from "../assets/img1ok.jpg";
import img2 from "../assets/img2ok.jpg";
import img3 from "../assets/img3.jpg";
import img4 from "../assets/img4ok.jpg";
import img5 from "../assets/img5ok.jpg";
import img6 from "../assets/img6ok.jpg";

const CatContext = createContext();

const CatProvider = ({ children }) => {
  const [cats] = useState([
    {
      id: 1,
      name: "Timi",
      age: "24 months",
      story: "Rescued from the streets",
      image: img1,
      characteristics: "playful, energetic",
      microship: "sí",
      vaccines: "no",
      dewormed: "sí",
      sterilized: "sí"
    },
    {
      id: 2,
      name: "Moi",
      age: "11 months",
      story: "Found in a park",
      image: img2,
      characteristics: "funny, observer",
      microship: "sí",
      vaccines: "no",
      dewormed: "sí",
      sterilized: "sí"
    },
    {
      id: 3,
      name: "Bruno",
      age: "16 months",
      story: "Rescued from a building",
      image: img3,
      characteristics: "sleepyhead, tender, cat friendly, dog friendly",
      microship: "sí",
      vaccines: "no",
      dewormed: "sí",
      sterilized: "no, con compromiso de esterilización"
    },
    {
      id: 4,
      name: "Tigre",
      age: "25 months",
      story: "Found in a park",
      image: img4,
      characteristics: "quiet, affectionate",
      microship: "sí",
      vaccines: "no",
      dewormed: "sí",
      sterilized: "sí"
    },
    {
      id: 5,
      name: "The Babies",
      age: "3 months",
      story: "Rescued from the streets",
      image: img5,
      characteristics: "funny, curious",
      microship: "sí",
      vaccines: "no",
      dewormed: "sí",
      sterilized: "no, con compromiso de esterilización"
    },
    {
      id: 6,
      name: "Dante",
      age: "24 months",
      story: "Found in a forest",
      image: img6, 
      characteristics: "quiet, sleepyhead",
      microship: "sí",
      vaccines: "no",
      dewormed: "sí",
      sterilized: "sí"
    }
  ]);

  const [selectedCat, setSelectedCat] = useState(null);

  const selectCat = (cat) => {
    setSelectedCat(cat);
  };

  return (
    <CatContext.Provider value={{ cats, selectedCat, selectCat }}>
      {children}
    </CatContext.Provider>
  );
};

export { CatContext, CatProvider };