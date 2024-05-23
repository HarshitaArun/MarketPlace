import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const Home = () => {
    const location = useLocation();
    const navigate = useNavigate();

    const handleBuyNow = () => {
        navigate('/buyMain', { state: { id: location.state.id } });
    };

    const handleSellNow = () => {
        navigate('/sellForm', { state: { id: location.state.id } });
    };

    return (
        <div className="homepage">
            <h1>Hello {location.state.id}! Buy or Sell?</h1>
            <button onClick={handleBuyNow}>Buy Now</button>
            <button onClick={handleSellNow}>Sell Now</button>
        </div>
    );
};

export default Home;
