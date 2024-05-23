import React from 'react';
import { useLocation } from 'react-router-dom';

const BuyMain = () => {
    const location = useLocation();
    return (
        <div>
            <h1>Buy Page</h1>
            <p>Welcome, {location.state.id}!</p>
        </div>
    );
};

export default BuyMain;
