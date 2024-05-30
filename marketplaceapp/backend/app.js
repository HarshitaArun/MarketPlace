const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bcrypt = require("bcrypt");
const multer = require('multer');
const Product = require('./productModel');
const User = require('./mongo'); 
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

mongoose.connect('mongodb://localhost:27017/marketplace', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
});

app.get("/", cors(), (req, res) => {
    res.send("Welcome to the API");
});

app.get('/products', async (req, res) => {
    try {
        const products = await Product.find();
        res.json(products);
    } catch (error) {
        console.error('Error fetching products:', error);
        res.status(500).json({ message: 'Failed to fetch products.' });
    }
});

app.get('/product/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const product = await Product.findById(id);
        if (product) {
            res.json(product);
        } else {
            res.status(404).json({ message: 'Product not found.' });
        }
    } catch (error) {
        console.error('Error fetching product:', error);
        res.status(500).json({ message: 'Failed to fetch product.' });
    }
});

app.post('/product/:id/bid', async (req, res) => {
    const { id } = req.params;
    const { bid, userEmail } = req.body;

    try {
        const product = await Product.findById(id);

        if (!product) {
            return res.status(404).json({ success: false, message: 'Product not found.' });
        }

        if (bid <= product.currentBid) {
            return res.status(400).json({ success: false, message: 'Your bid must be higher than the current bid.' });
        }

        product.currentBid = bid;
        product.currentBidder = userEmail;

        await product.save();

        res.json({ success: true, message: 'Bid placed successfully.' });
    } catch (error) {
        console.error('Error placing bid:', error);
        res.status(500).json({ success: false, message: 'Failed to place bid.' });
    }
});

app.post("/login", async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });
        if (user && await bcrypt.compare(bcrypt.encrypt(password), user.password)) {
            res.json("exist");
        } else {
            res.json("not exist");
        }
    } catch (e) {
        console.error('Error during login:', e);
        res.status(500).json({ message: 'An error occurred during login.' });
    }
});


app.post("/signup", async (req, res) => {
    const { name, email, password } = req.body;

    try {
        const userExists = await User.findOne({ email });
        if (userExists) {
            res.json("exist");
        } else {
            const newUser = new User({
                name,
                email,
                password,
        
            });
            await User.create(newUser);
            res.json("not exist");
        }
    } catch (e) {
        console.error('Error during signup:', e);
        res.status(500).json({ message: 'An error occurred during signup.' });
    }
});

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + '-' + file.originalname);
    },
});

const upload = multer({ storage: storage });

app.post('/sellForm', upload.single('image'), async (req, res) => {
    const { productName, brandName, condition, initialPrice, bidTime, userEmail } = req.body;
    const image = req.file ? req.file.filename : null;

    try {
        const newProduct = new Product({
            productName,
            brandName,
            condition,
            initialPrice,
            bidTime,
            image,
            userEmail,
            currentBid: initialPrice,
            currentBidder: null       
        });

        await newProduct.save();
        res.json({ message: 'Product listed successfully!' });
    } catch (error) {
        console.error('Error listing product:', error);
        res.status(500).json({ message: 'Failed to list product.' });
    }
});


app.listen(8000, () => {
    console.log("Server is running on port 8000");
});
