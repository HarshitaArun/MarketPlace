import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';

const Messages = () => {
    const location = useLocation();
    const [productName, setProductName] = useState('');
    const [brandName, setBrandName] = useState('');
    const [condition, setCondition] = useState('new');
    const [initialPrice, setInitialPrice] = useState('');
    const [bidTime, setBidTime] = useState('');
    const [image, setImage] = useState(null);
    const userEmail = location.state.id;

    const handleImageChange = (e) => {
        setImage(e.target.files[0]);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('productName', productName);
        formData.append('brandName', brandName);
        formData.append('condition', condition);
        formData.append('initialPrice', initialPrice);
        formData.append('bidTime', bidTime);
        formData.append('image', image);
        formData.append('userEmail', userEmail);

        try {
            const response = await axios.post('http://localhost:8000/sellForm', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            console.log(response.data);
            alert('Product listed successfully!');
        } catch (error) {
            console.error('Error listing product:', error);
            alert('Failed to list product.');
        }
    };

    return (
        <div>
            <h1>Sell Page</h1>
            <p>Welcome, {userEmail}!</p>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Product Name:</label>
                    <input
                        type="text"
                        value={productName}
                        onChange={(e) => setProductName(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Brand Name:</label>
                    <input
                        type="text"
                        value={brandName}
                        onChange={(e) => setBrandName(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Condition:</label>
                    <select
                        value={condition}
                        onChange={(e) => setCondition(e.target.value)}
                        required
                    >
                        <option value="new">New</option>
                        <option value="used">Used</option>
                    </select>
                </div>
                <div>
                    <label>Initial Price:</label>
                    <input
                        type="number"
                        value={initialPrice}
                        onChange={(e) => setInitialPrice(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Bid Time (in hours):</label>
                    <input
                        type="number"
                        value={bidTime}
                        onChange={(e) => setBidTime(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Reference Image:</label>
                    <input
                        type="file"
                        onChange={handleImageChange}
                        required
                    />
                </div>
                <button type="submit">List Product</button>
            </form>
        </div>
    );
};

export default Messages;
