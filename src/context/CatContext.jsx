import { createContext, useState } from 'react';
import img1 from "../assets/img1.jpg";
import img2 from "../assets/img2.jpg";
import img3 from "../assets/img3.jpg";
import img4 from "../assets/img4.jpg";
import img5 from "../assets/img5.jpg";
import img6 from "../assets/img6.jpg";

const CatContext = createContext();

const CatProvider = ({ children }) => {
  const [cats] = useState([
    {
      id: 1,
      name: "Whisko",
      age: "24 months",
      story: "Rescued from the streets",
      image: img1,
      characteristics: "playful, energetic",
      microship: "sí",
      vaccines: "no",
      dewormed: "sí",
      sterilized: "esterilizado"
    },
    {
      id: 2,
      name: "Mitta",
      age: "11 months",
      story: "Found in a park",
      image: img2,
      characteristics: "funny, observer",
      microship: "sí",
      vaccines: "no",
      dewormed: "sí",
      sterilized: "esterilizado"
    },
    {
      id: 3,
      name: "Bruno",
      age: "6 months",
      story: "Rescued from a building",
      image: img3,
      characteristics: "sleepyhead, tender",
      microship: "sí",
      vaccines: "no",
      dewormed: "sí",
      sterilized: "con compromiso de esterilización"
    },
    {
      id: 4,
      name: "Anís",
      age: "15 months",
      story: "Found in a park",
      image: img4,
      characteristics: "quiet, affectionate",
      microship: "sí",
      vaccines: "no",
      dewormed: "sí",
      sterilized: "esterilizado"
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
      sterilized: "con compromiso de esterilización"
    },
    {
      id: 6,
      name: "Neo",
      age: "24 months",
      story: "Found in a forest",
      image: img6, 
      characteristics: "quiet, sleepyhead",
      microship: "sí",
      vaccines: "no",
      dewormed: "sí",
      sterilized: "esterilizado"
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