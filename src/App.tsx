import { useState } from 'react';

import CreateProduct from './components/CreateProduct';
import ErrorMessage from './components/ErrorMessage';
import Loader from './components/Loader';
import Modal from './components/Modal';
import Product from './components/Product';

import { useProducts } from './hooks/products';
import { IProduct } from './models/product';


function App() {

  const {products, error, loading, addProduct} = useProducts();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const createHandler = (product: IProduct) => {
    addProduct(product);
    setIsModalOpen(false);
  }
 
  return (
    <div className="container mx-auto max-w-2xl pt-5">
      {error && <ErrorMessage error={error}/>}
      {loading && <Loader />}
      {products.map(product => <Product product={product} key={product.id}/>)}   

      {isModalOpen && 
        <Modal onClose={() => setIsModalOpen(false)} title="Create new Product">
          <CreateProduct onCreate={createHandler} />
        </Modal>
      }

      <button 
        onClick={() => setIsModalOpen(true)}
        className="absolute bottom-5 right-5 rounded-full bg-red-700 text-white text-2xl px-4 py-2 flex items-center">
        +
      </button>
    </div>
  );
}

export default App;
