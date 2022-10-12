import axios from 'axios';
import React, { useState } from 'react';
import { IProduct } from '../models/product';
import ErrorMessage from './ErrorMessage';

interface CreateProductProps {
    onCreate: (product: IProduct) => void
}

const CreateProduct = ({onCreate}: CreateProductProps) => {

    const [value, setValue] = useState<IProduct>({
        title: '', 
        description: '', 
        price: 0, 
        image: '',
        category: ''});
    const [error, setError] = useState<string>('');

    const validate = (obj: IProduct): boolean => {

        let isCorrect = true;
        let key: keyof IProduct

        for (key in obj) {
            if (!obj[key]) {
                isCorrect = false;
            }
        }

        return isCorrect;
    }
 
    const submitHandler = async (event: React.FormEvent) => {
        event.preventDefault();
        if (validate(value)) {
            setError('')
            const response = await axios.post<IProduct>('https://fakestoreapi.com/products', value)
            onCreate(response.data)
        } else {
            setError('Please enter valid values')

        }
    }

    const changeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
        setValue({...value, [event.target.id]: event.target.value})
    }

    return (
        <form onSubmit={submitHandler}>

            {error && <ErrorMessage error={error} />}

            <input 
                type="text"
                className="border py-2 px-4 mb-2 w-full outline-none"
                placeholder="Enter product title..."
                value={value.title}
                id="title"
                onChange={changeHandler}
            />
            <input 
                type="text"
                className="border py-2 px-4 mb-2 w-full outline-none"
                placeholder="Enter product description..."
                value={value.description}
                id="description"
                onChange={changeHandler}
            />
            <input 
                type="number"
                className="border py-2 px-4 mb-2 w-full outline-none"
                placeholder="Enter product price..."
                value={value.price}
                id="price"
                onChange={changeHandler}
            />
            <input 
                type="text"
                className="border py-2 px-4 mb-2 w-full outline-none"
                placeholder="Enter product image..."
                value={value.image}
                id="image"
                onChange={changeHandler}
            />
            <input 
                type="text"
                className="border py-2 px-4 mb-2 w-full outline-none"
                placeholder="Enter product category..."
                value={value.category}
                id="category"
                onChange={changeHandler}
            />
            

            <button type="submit" className="py-2 px-4 border bg-yellow-400">Create</button>
        </form>
    );
};

export default CreateProduct;