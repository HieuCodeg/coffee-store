import { Routes, Route } from 'react-router-dom';
import './App.css';
import Navbar from './components/Navbar/Navbar';
import ProductList from './components/ProductList/ProductList';

function App() {
  return (
    <>
      <Navbar/>
      <Routes>
        <Route path='/' element={<ProductList />} />
      </Routes>
    </>
  );
}

export default App;
