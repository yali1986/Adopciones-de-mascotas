
import { createContext, useState, useEffect } from 'react';
import { collection, getDocs } from "firebase/firestore";
import { ref, getDownloadURL } from 'firebase/storage';
import { db, storage } from '../credenciales'; // Asegúrate de que la ruta sea correcta

const CatContext = createContext();

const CatProvider = ({ children }) => {
  const [cats, setCats] = useState([]);
  const [selectedCat, setSelectedCat] = useState(null);

  useEffect(() => {
    const fetchCats = async () => {
      const catCollection = collection(db, "cats");
      const catSnapshot = await getDocs(catCollection);
      const catList = catSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));

      // Fetch image URLs for each cat
      const catsWithImages = await Promise.all(catList.map(async (cat) => {
        const imageRef = ref(storage, `catsInAdoptImg/${cat.image}`);
        const imageUrl = await getDownloadURL(imageRef);
        return { ...cat, image: imageUrl };
      }));

      setCats(catsWithImages);
    };

    fetchCats();
  }, []);

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