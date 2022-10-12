import React, {useState} from 'react';
import { IProduct } from '../models/product';

interface Props {
    product: IProduct
}

const Product = ({product}: Props) => {

    const [details, setDetails] = useState(false)

    const btnClassName = details ? 'bg-yellow-400' : 'bg-blue-400'

    const btnClasses = ['py-2 px-4 border', btnClassName]

    return (
        <div className="border py-2 px-4 rounded flex-col mb-2 items-center flex">
            <img src={product.image} className="w-1/6" alt={product.title} /> 
            <p>{product.title}</p>
            <span className="font-bold">{product.price}</span>
            <button 
                className={btnClasses.join(" ")}
                onClick={() => setDetails(prev => !prev)}
                >
                {details ? 'Hidde Details' : 'Show Details'}
            </button>

            {details && <div>
                <p>{product.description}</p>
                <p>Rate: <span style={{fontWeight: 'bold'}}>{product?.rating?.rate}</span></p>
            </div>}

        </div>
    );
};

export default Product;