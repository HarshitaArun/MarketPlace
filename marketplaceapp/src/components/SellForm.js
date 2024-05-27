import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Style/BuyMain.css';  // Add this line to import the CSS

const BuyMain = ({ currentUserEmail }) => {
    const [products, setProducts] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await axios.get('http://localhost:8000/products');
                setProducts(response.data.filter(product => product.userEmail !== currentUserEmail));
            } catch (error) {
                console.error('Error fetching products:', error);
            }
        };

        fetchProducts();
    }, [currentUserEmail]);

    return (
        <div className="buy-main">
            <header className="header">
                <button onClick={() => navigate('/sellForm')}>Sell Here</button>
                <button onClick={() => navigate('/messages')}>Check for Messages</button>
            </header>
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
