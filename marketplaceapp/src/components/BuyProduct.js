import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const BuyProduct = () => {
    const { id } = useParams();
    const [product, setProduct] = useState(null);
    const [remainingTime, setRemainingTime] = useState('');

    useEffect(() => {
    const fetchProduct = async () => {
        try {
            const response = await axios.get(`http://localhost:8000/product/${id}`);
            const productData = response.data;
            console.log('Product Data:', productData);

            const endTime = new Date(productData.createdAt);
            endTime.setHours(endTime.getHours() + productData.bidTime);
            console.log('End Time:', endTime);

            const updateRemainingTime = () => {
                const currentTime = new Date();
                console.log('Current Time:', currentTime);
                const timeDiff = endTime - currentTime;
                console.log('Time Difference:', timeDiff);

                if (timeDiff <= 0) {
                    setRemainingTime("00:00:00");
                    clearInterval(intervalId);
                } else {
                    const hours = Math.floor(timeDiff / 1000 / 60 / 60);
                    const minutes = Math.floor((timeDiff / 1000 / 60) % 60);
                    const seconds = Math.floor((timeDiff / 1000) % 60);

                    setRemainingTime(
                        `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`
                    );
                }
            };

            updateRemainingTime(); 
            const intervalId = setInterval(updateRemainingTime, 1000);

            return () => clearInterval(intervalId);
        } catch (error) {
            console.error('Error fetching product:', error);
            setRemainingTime("Error");
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
            <p><strong>Bid Time Remaining:</strong> {remainingTime}</p>
            <p><strong>Seller:</strong> {product.userEmail}</p>
        </div>
    );
};

export default BuyProduct;