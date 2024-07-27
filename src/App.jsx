
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './Pages/Home';
import Header from './components/Header';
import Footer from './components/Footer';
import Form from './Pages/Form';
import CardDetail from './Pages/CardDetail';
import { CatProvider } from './context/CatContext';

function App() {
  return (
    <BrowserRouter>
      <CatProvider>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/detail" element={<CardDetail />} />
          <Route path="/form" element={<Form />} />
        </Routes>
        <Footer />
      </CatProvider>
    </BrowserRouter>
  );
}

export default App;


