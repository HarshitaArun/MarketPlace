import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const BuyMain = () => {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await axios.get('http://localhost:8000/products');
                setProducts(response.data);
            } catch (error) {
                console.error('Error fetching products:', error);
            }
        };

        fetchProducts();
    }, []);

    return (
        <div className="buy-main">
            <h1>Products</h1>
            <div className="product-grid">
                {products.map(product => (
                    <div key={product._id} className="product-card">
                        <img src={`http://localhost:8000/uploads/${product.image}`} alt={product.productName} />
                        <h2>{product.productName}</h2>
                        <p>${product.initialPrice}</p>
                        <Link to={`/product/${product._id}`}>
                            <button>View Product</button>
                        </Link>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default BuyMain;
