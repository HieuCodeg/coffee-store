import { Routes, Route } from 'react-router-dom';
import './App.css';
import Navbar from './components/Navbar/Navbar';
import ProductList from './components/ProductList/ProductList';
import CreateProduct from './components/CreateProduct/CreateProduct';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import EditProduct from './components/EditProduct/EditProduct';

function App() {
  return (
    <>
      <ToastContainer position="top-right" autoClose={2000}/>
      <Navbar/>
      <Routes>
        <Route path='/coffee-store' element={<ProductList />} />
        <Route path='/coffee-store/product/create' element={<CreateProduct />} />
        <Route path='/coffee-store/product/edit/:productId' element={<EditProduct />} />
      </Routes>
   </>
  );
}

export default App;
