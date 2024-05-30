const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    productName: { type: String, required: true },
    brandName: { type: String, required: true },
    condition: { type: String, required: true },
    initialPrice: { type: Number, required: true },
    bidTime: { type: Number, required: true }, 
    image: { type: String, required: true },
    userEmail: { type: String, required: true },
    currentBid: { type: Number, required: true, default: function() { return this.initialPrice; } },
    currentBidder: { type: String, default: null }
}, { timestamps: true }); 

const Product = mongoose.model('Product', productSchema);

module.exports = Product;
