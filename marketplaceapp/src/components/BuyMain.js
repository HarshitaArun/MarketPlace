import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useLocation } from 'react-router-dom';
import './Style/BuyMain.css'; // Make sure this path is correct

const BuyMain = () => {
    const [products, setProducts] = useState([]);
    const location = useLocation();
    const userEmail = location.state?.userEmail;

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
        <div className="buy-main-container">
            <div className="top-dashboard">
                <Link to={{ pathname: '/sellForm', state: { userEmail } }} className="dashboard-link">Sell Here</Link>
                <Link to={{ pathname: '/messages', state: { userEmail } }} className="dashboard-link">Notifications</Link>
            </div>
            <div className="product-grid">
                {products.map(product => (
                    <div key={product._id} className="product-card">
                        <img src={`http://localhost:8000/uploads/${product.image}`} alt={product.productName} />
                        <h3>{product.productName}</h3>
                        <p>${product.initialPrice}</p>
                        <Link to={{ pathname: `/buyProduct/${product._id}`, state: { userEmail } }}>
                            View Product
                        </Link>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default BuyMain;
