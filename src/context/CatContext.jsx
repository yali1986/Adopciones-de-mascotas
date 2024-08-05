
import { createContext, useState, useEffect } from 'react';
import { collection, addDoc } from "firebase/firestore";
import { db } from '../credenciales'; 
import img1 from "../assets/img1ok.jpg";
import img2 from "../assets/img2ok.jpg";
import img3 from "../assets/img3ok.jpg";
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
      microchip: "sí",
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
      microchip: "sí",
      vaccines: "no",
      dewormed: "sí",
      sterilized: "sí"
    },
    {
      id: 3,
      name: "Noel",
      age: "16 months",
      story: "Rescued from a building",
      image: img3,
      characteristics: "sleepyhead, tender, cat friendly, dog friendly",
      microchip: "sí",
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
      microchip: "sí",
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
      microchip: "sí",
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
      microchip: "sí",
      vaccines: "no",
      dewormed: "sí",
      sterilized: "sí"
    }
  ]);

  const [selectedCat, setSelectedCat] = useState(null);

  const selectCat = (cat) => {
    setSelectedCat(cat);
  };

  const uploadCats = async () => {
    const catCollection = collection(db, "cats");
    for (const cat of cats) {
      await addDoc(catCollection, cat);
    }
    console.log("Cats uploaded successfully");
  };

  return (
    <CatContext.Provider value={{ cats, selectedCat, selectCat, uploadCats }}>
      {children}
    </CatContext.Provider>
  );
};

export { CatContext, CatProvider };
