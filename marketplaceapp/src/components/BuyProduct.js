import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const BuyProduct = () => {
    const { id } = useParams();
    const [product, setProduct] = useState(null);

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const response = await axios.get(`http://localhost:8000/product/${id}`);
                setProduct(response.data);
            } catch (error) {
                console.error('Error fetching product:', error);
            }
        };

        fetchProduct();
    }, [id]);

    if (!product) {
        return <div>Loading...</div>;
    }

    return (
        <div className="product-detail">
            <h1>{product.productName}</h1>
            <img src={`http://localhost:8000/uploads/${product.image}`} alt={product.productName} />
            <p><strong>Brand Name:</strong> {product.brandName}</p>
            <p><strong>Condition:</strong> {product.condition}</p>
            <p><strong>Initial Price:</strong> ${product.initialPrice}</p>
            <p><strong>Bid Time:</strong> {product.bidTime} hours</p>
            <p><strong>Seller:</strong> {product.userEmail}</p>
        </div>
    );
};

export default BuyProduct;
