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
    const { name, email, password, dob } = req.body;

    try {
        const userExists = await User.findOne({ email });
        if (userExists) {
            res.json("exist");
        } else {
            const newUser = new User({
                name,
                email,
                password,
                dob: new Date(dob) 
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
